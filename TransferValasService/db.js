const mysql = require("mysql2");
require("dotenv").config();

const valasDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.VALAS_DB,
});

const userDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.USER_DB,
});

valasDB.connect((err) => {
  if (err) console.error("Valas DB error:", err);
  else console.log("Connected to Valas DB");
});

userDB.connect((err) => {
  if (err) console.error("User DB error:", err);
  else console.log("Connected to User DB");
});

module.exports = { valasDB, userDB };
