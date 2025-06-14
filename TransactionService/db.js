require("dotenv").config();
const mysql = require("mysql2");

const transactionDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.TRANSACTION_DB,
});

const userDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.USER_DB,
});

transactionDB.connect((err) => {
  if (err) console.error("Transaction DB Error:", err);
  else console.log("Connected to Transaction DB");
});

userDB.connect((err) => {
  if (err) console.error("User DB Error:", err);
  else console.log("Connected to User DB");
});

module.exports = { transactionDB, userDB };
