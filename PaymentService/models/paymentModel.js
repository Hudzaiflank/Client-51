const db = require("../db");

const Payment = {
  getAll: (cb) => db.query("SELECT * FROM payments", cb),

  getById: (id, cb) =>
    db.query("SELECT * FROM payments WHERE id = ?", [id], cb),

  create: (data, cb) => {
    const { user_id, va_number, amount, description, status } = data;
    db.query(
      "INSERT INTO payments (user_id, va_number, amount, description, status) VALUES (?, ?, ?, ?, ?)",
      [user_id, va_number, amount, description, status],
      cb
    );
  },

  update: (id, data, cb) => {
    const { user_id, va_number, amount, description, status } = data;
    db.query(
      "UPDATE payments SET user_id = ?, va_number = ?, amount = ?, description = ?, status = ? WHERE id = ?",
      [user_id, va_number, amount, description, status, id],
      cb
    );
  },

  delete: (id, cb) => db.query("DELETE FROM payments WHERE id = ?", [id], cb),
};

module.exports = Payment;
