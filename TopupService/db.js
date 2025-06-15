require("dotenv").config();
const mysql = require("mysql2/promise");

const topupDB = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.TOPUP_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const userDB = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.USER_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = { topupDB, userDB };
