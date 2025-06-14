// models/userModel.js
const db = require("../db");

const User = {
  getAll: (callback) => {
    db.query("SELECT * FROM users", callback);
  },
  getById: (id, callback) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], callback);
  },
  create: (user, callback) => {
    const { name, email, password, account_number, balance } = user;
    db.query(
      "INSERT INTO users (name, email, password, account_number, balance) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, account_number, balance],
      callback
    );
  },
  update: (id, user, callback) => {
    const { name, email, password, account_number, balance } = user;
    db.query(
      "UPDATE users SET name = ?, email = ?, password = ?, account_number = ?, balance = ? WHERE id = ?",
      [name, email, password, account_number, balance, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query("DELETE FROM users WHERE id = ?", [id], callback);
  },
};

module.exports = User;
