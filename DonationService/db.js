require("dotenv").config();
const mysql = require("mysql2");

// Koneksi ke database donation
const donationDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DONATION_DB,
});

// Koneksi ke database user
const userDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.USER_DB,
});

donationDB.connect((err) => {
  if (err) {
    console.error("Donation DB connection error:", err);
    return;
  }
  console.log("Connected to Donation DB");
});

userDB.connect((err) => {
  if (err) {
    console.error("User DB connection error:", err);
    return;
  }
  console.log("Connected to User DB");
});

module.exports = { donationDB, userDB };
