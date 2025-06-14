const db = require("../db");

const Tagihan = {
  getAll: (cb) => db.query("SELECT * FROM tagihans", cb),

  getById: (id, cb) =>
    db.query("SELECT * FROM tagihans WHERE id = ?", [id], cb),

  create: (data, cb) => {
    const { user_id, va_number, amount, description, status } = data;
    db.query(
      "INSERT INTO tagihans (user_id, va_number, amount, description, status) VALUES (?, ?, ?, ?, ?)",
      [user_id, va_number, amount, description, status],
      cb
    );
  },

  update: (id, data, cb) => {
    const { user_id, va_number, amount, description, status } = data;
    db.query(
      "UPDATE tagihans SET user_id = ?, va_number = ?, amount = ?, description = ?, status = ? WHERE id = ?",
      [user_id, va_number, amount, description, status, id],
      cb
    );
  },

  delete: (id, cb) => db.query("DELETE FROM tagihans WHERE id = ?", [id], cb),
};

module.exports = Tagihan;
