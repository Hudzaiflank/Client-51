const mysql = require("mysql2");
require("dotenv").config();

const txDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.TX_DB,
});

const userDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.USER_DB,
});

txDB.connect((err) => {
  if (err) console.error("TX DB error:", err);
  else console.log("Connected to Transaction DB");
});

userDB.connect((err) => {
  if (err) console.error("User DB error:", err);
  else console.log("Connected to User DB");
});

module.exports = { txDB, userDB };
