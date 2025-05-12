const jwt = require("jsonwebtoken");
const sql = require("mssql");
const config = require("./config");

module.exports = async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).send({ message: "Missing auth token" });

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, config.JWT);
    const pool = await sql.connect(config.DB);

    const result = await pool.request()
      .input("userId", sql.Int, decoded.userId)
      .input("token", sql.NVarChar, token)
      .query("SELECT * FROM CUSTOMER WHERE CustomerIdPK = @userId AND Token = @token");

    if (result.recordset.length === 0) {
      return res.status(401).send({ message: "Invalid or expired token" });
    }

    req.user = result.recordset[0];
    req.token = token;
    next();
  } catch (err) {
    res.status(401).send({ message: "Authentication failed" });
  }
};
