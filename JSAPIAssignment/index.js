const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./config.js");
const authMiddleware = require("./authMiddleware.js");

const app = express();
const port = 5555;

app.use(cors());
app.use(express.json());

// //🔐 SIGNUP - Register New User
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const pool = await sql.connect(config.DB);

    // Check for duplicate email
    const existingUser = await pool.request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM CUSTOMER WHERE Email = @email");

    if (existingUser.recordset.length > 0) {
      return res.status(400).send({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.request()
      .input("firstName", sql.NVarChar, firstName)
      .input("lastName", sql.NVarChar, lastName)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, hashedPassword)
      .query(`
        INSERT INTO CUSTOMER (FirstName, LastName, Email, Password)
        VALUES (@firstName, @lastName, @email, @password)
      `);

    res.status(201).send({ message: "User registered successfully" });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send({ message: "Server error during signup" });
  }
});

// 🔐 LOGIN - Authenticate User & Generate Token
app.post("/login", async (req, res) => 
  {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  try {
    const pool = await sql.connect(config.DB);

    const result = await pool.request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM CUSTOMER WHERE Email = @email");

    if (result.recordset.length === 0) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.CustomerIdPK }, config.JWT, { expiresIn: "15m" });

    await pool.request()
      .input("token", sql.NVarChar, token)
      .input("userId", sql.Int, user.CustomerIdPK)
      .query("UPDATE CUSTOMER SET Token = @token WHERE CustomerIdPK = @userId");

    res.status(200).send({
      token: token,
      user: {
        customerId: user.CustomerIdPK,
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send({ message: "Server error during login" });
  }
});

// 🚪 LOGOUT - Remove Token
app.post("/logout", authMiddleware, async (req, res) => {
  try {
    const pool = await sql.connect(config.DB);
    await pool.request()
      .input("userId", sql.Int, req.user.CustomerIdPK)
      .query("UPDATE CUSTOMER SET Token = NULL WHERE CustomerIdPK = @userId");

    res.send({ message: "Successfully logged out" });

  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).send({ message: "Server error during logout" });
  }
});

// 🧾 CREATE ORDER - Protected Route
app.post("/createorder", authMiddleware, async (req, res) => {
  const { price,  foodItems } = req.body;

  if (price<=0 ||  !Array.isArray(foodItems) || foodItems.length === 0) {
    return res.status(400).send({ message: "price, and foodItems are required" });
  }

  // Validate foodItems
  for (const item of foodItems) {
    if (
      !item ||
      typeof item.foodItemId !== "number" ||
      typeof item.qty !== "number" ||
      item.qty <= 0
    ) {
      return res.status(400).send({
        message: "Each foodItem must have valid numeric foodItemId and positive qty"
      });
    }
  }

  const customerId = req.user.CustomerIdPK;

  try {
    const pool = await sql.connect(config.DB);

    // Start a transaction
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    const request = new sql.Request(transaction);

    // 1. Insert into ORDER table
    const insertOrderResult = await request
      .input("CustomerId", sql.Int, customerId)
      .input("Price", sql.Decimal(10, 2), price)
      
      .query(`
        INSERT INTO [ORDER_ITEM] (CustomerIdFK, OrderDate, Price, Status)
        OUTPUT INSERTED.OrderIdPK
        VALUES (@CustomerId, GETDATE(), @Price, 'Pending')
      `);

    const orderId = insertOrderResult.recordset[0].OrderIdPK;

    // 2. Insert into ORDER_FOOD_ITEM
    for (const item of foodItems) {
      await new sql.Request(transaction)
        .input("OrderId", sql.Int, orderId)
        .input("FoodItemId", sql.Int, item.foodItemId)
        .input("QtyOrdered", sql.Int, item.qty)
        
        .query(`
          INSERT INTO FOOD_ITEM_ORDER_ITEM (OrderIdPK, FoodIdPK,  item_qty)
          VALUES (@OrderId, @FoodItemId,  @QtyOrdered)
        `);
    }

    // Commit transaction
    await transaction.commit();

    res.status(201).send({
      message: "Order created successfully",
      orderId,
      foodItems
    });

  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).send({ message: "Server error while creating order" });
  }
});


// Get Order by Customer ID


app.get("/orders", authMiddleware, async (req, res) => {
  const customerId = req.user.CustomerIdPK;

  try {
    const pool = await sql.connect(config.DB);

    const result = await pool.request()
  .input("customerId", sql.Int, customerId)
  .query(`
    SELECT 
      oi.OrderIdPK,
      oi.OrderDate,
      oi.Price,
      fi.FoodIdPK,
      fi.Name AS FoodItemName,
      foi.Item_Qty AS QtyOrdered,
      oi.Status AS ItemStatus,
      c.FirstName
    FROM [dbo].[ORDER_ITEM] AS oi 
    JOIN [dbo].[FOOD_ITEM_ORDER_ITEM] AS foi 
      ON oi.OrderIdPK = foi.OrderIdPK
    JOIN [dbo].[FOOD_ITEM] AS fi 
      ON foi.FoodIdPK = fi.FoodIdPK
    JOIN [dbo].[CUSTOMER] AS c 
      ON oi.CustomerIdFK = c.CustomerIdPK
    WHERE oi.CustomerIdFK = @customerId
    ORDER BY oi.OrderDate DESC
  `);


  const ordersMap = {};
  result.recordset.forEach(row => {
    if (!ordersMap[row.OrderIdPK]) {
      ordersMap[row.OrderIdPK] = {
        orderId: row.OrderIdPK,
        orderDate: row.OrderDate,
        price: row.Price,
        items: []
      };
    }
    ordersMap[row.OrderIdPK].items.push({
      foodId: row.FoodIdPK,
      name: row.FoodItemName,
      quantity: row.QtyOrdered,
      status: row.ItemStatus
    });
  });
  

    const orders = Object.values(ordersMap);
    res.status(200).json(orders);

  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).send({ message: "Server error while retrieving orders" });
  }
});


// Get order by order id
app.get("/orders/:orderId", authMiddleware, async (req, res) => {
  const orderId = parseInt(req.params.orderId);

  try {
    const pool = await sql.connect(config.DB);
    const result = await pool.request()
      .input("orderId", sql.Int, orderId)
      .query(`
        SELECT 
          oi.OrderIdPK,
          oi.OrderDate,
          oi.Price,
          fi.Name AS FoodItemName,
          foi.item_qty,
          oi.Status
        FROM ORDER_ITEM oi
        JOIN FOOD_ITEM_ORDER_ITEM foi ON oi.OrderIdPK = foi.OrderIdPK
        JOIN FOOD_ITEM fi ON foi.FoodIdPK = fi.FoodIdPK
        WHERE oi.OrderIdPK = @orderId
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = {
      orderId: result.recordset[0].OrderIdPK,
      orderDate: result.recordset[0].OrderDate,
      price: result.recordset[0].Price,
      items: result.recordset.map(row => ({
        name: row.FoodItemName,
        quantity: row.item_qty,
        status: row.Status
      }))
    };

    res.status(200).json(order);

  } catch (err) {
    console.error("Get order by ID error:", err);
    res.status(500).send({ message: "Server error" });
  }
});

// Get fooditem by fooditem id
app.get("/fooditem/:foodItemId", async (req, res) => {
  const foodItemId = parseInt(req.params.foodItemId);

  try {
    const pool = await sql.connect(config.DB);
    const result = await pool.request()
      .input("foodItemId", sql.Int, foodItemId)
      .query(`
        SELECT fi.FoodIdPK, fi.Name, fi.Quantity, ct.Name AS Cuisine
        FROM FOOD_ITEM fi
        JOIN CUISINE_TYPE ct ON fi.CuisineIdFK = ct.CuisineIdPK
        WHERE fi.FoodIdPK = @foodItemId
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res.status(200).json(result.recordset[0]);

  } catch (err) {
    console.error("Get food item by ID error:", err);
    res.status(500).send({ message: "Server error" });
  }
});

// Get food items
app.get("/fooditems", async (req, res) => {
  try {
    const pool = await sql.connect(config.DB);
    const result = await pool.request()
      .query(`
        SELECT fi.FoodIdPK, fi.Name, fi.Quantity, ct.Name AS Cuisine
        FROM FOOD_ITEM fi
        JOIN CUISINE_TYPE ct ON fi.CuisineIdFK = ct.CuisineIdPK
      `);

    res.status(200).json(result.recordset);

  } catch (err) {
    console.error("Get food items error:", err);
    res.status(500).send({ message: "Server error" });
  }
});







app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
