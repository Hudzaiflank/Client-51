const mysql = require("mysql2");
require("dotenv").config();

const topupDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.TOPUP_DB,
});

const userDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.USER_DB,
});

topupDB.connect((err) => {
  if (err) console.error("Topup DB error:", err);
  else console.log("Connected to Topup DB");
});

userDB.connect((err) => {
  if (err) console.error("User DB error:", err);
  else console.log("Connected to User DB");
});

module.exports = { topupDB, userDB };
