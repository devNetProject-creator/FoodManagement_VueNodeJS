const express = require('express');
const router = express.Router();
const db = require('../JSAPIAssignment/dbConnectExec');
const auth = require('../JSAPIAssignment/authMiddleware');

router.post('/', auth, async (req, res) => {
  const { price, status, foodItems } = req.body;

  // Basic validation
  if (!price || !status || !Array.isArray(foodItems) || foodItems.length === 0) {
    return res.status(400).json({ message: 'price, status, and foodItems[] are required' });
  }

  // Validate each foodItem object
  for (const item of foodItems) {
    if (
      !item ||
      typeof item.foodItemId !== 'number' ||
      typeof item.qty !== 'number' ||
      item.qty <= 0
    ) {
      return res.status(400).json({ message: 'Each foodItem must include a valid foodItemId and positive qty' });
    }
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Insert into ORDER
    const [orderResult] = await conn.execute(
      'INSERT INTO `ORDER` (CustomerId, OrderDate, Price, Status) VALUES (?, NOW(), ?, ?)',
      [req.user.id, price, status]
    );
    const orderId = orderResult.insertId;

    // Insert into ORDER_FOOD_ITEM
    for (const item of foodItems) {
      const { foodItemId, qty } = item;

      await conn.execute(
        'INSERT INTO ORDER_FOOD_ITEM (OrderId, FoodItemId, Status, QtyOrdered) VALUES (?, ?, ?, ?)',
        [orderId, foodItemId, 'pending', qty]
      );
    }

    await conn.commit();
    res.status(201).json({
      message: 'Order created successfully',
      orderId,
      foodItems
    });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    conn.release();
  }
});

module.exports = router;
