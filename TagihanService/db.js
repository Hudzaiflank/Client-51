const mysql = require("mysql2");
require("dotenv").config();

const tagihanDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.TAGIHAN_DB,
});

const userDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.USER_DB,
});

tagihanDB.connect((err) => {
  if (err) console.error("Tagihan DB error:", err);
  else console.log("Connected to Tagihan DB");
});

userDB.connect((err) => {
  if (err) console.error("User DB error:", err);
  else console.log("Connected to User DB");
});

module.exports = { tagihanDB, userDB };
