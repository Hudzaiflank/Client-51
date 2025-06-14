const db = require("../db");

const Topup = {
  getAll: (callback) => {
    db.query("SELECT * FROM topups", callback);
  },
  getById: (id, callback) => {
    db.query("SELECT * FROM topups WHERE id = ?", [id], callback);
  },
  create: (data, callback) => {
    const { user_id, amount, payment_method, status } = data;
    db.query(
      "INSERT INTO topups (user_id, amount, payment_method, status) VALUES (?, ?, ?, ?)",
      [user_id, amount, payment_method, status],
      callback
    );
  },
  update: (id, data, callback) => {
    const { user_id, amount, payment_method, status } = data;
    db.query(
      "UPDATE topups SET user_id = ?, amount = ?, payment_method = ?, status = ? WHERE id = ?",
      [user_id, amount, payment_method, status, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query("DELETE FROM topups WHERE id = ?", [id], callback);
  },
};

module.exports = Topup;
