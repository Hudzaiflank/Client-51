require("dotenv").config();
const mysql = require("mysql2/promise");

const transactionDB = mysql.createPool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.TRANSACTION_DB,
});

const userDB = mysql.createPool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.USER_DB,
});

module.exports = { transactionDB, userDB };
