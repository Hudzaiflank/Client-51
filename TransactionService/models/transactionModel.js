const db = require("../db");

const Transaction = {
  getAll: (callback) => {
    db.query("SELECT * FROM transactions", callback);
  },
  getById: (id, callback) => {
    db.query("SELECT * FROM transactions WHERE id = ?", [id], callback);
  },
  create: (data, callback) => {
    const { sender_id, recipient_id, amount, note, status } = data;
    db.query(
      "INSERT INTO transactions (sender_id, recipient_id, amount, note, status) VALUES (?, ?, ?, ?, ?)",
      [sender_id, recipient_id, amount, note, status],
      callback
    );
  },
  update: (id, data, callback) => {
    const { sender_id, recipient_id, amount, note, status } = data;
    db.query(
      "UPDATE transactions SET sender_id = ?, recipient_id = ?, amount = ?, note = ?, status = ? WHERE id = ?",
      [sender_id, recipient_id, amount, note, status, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query("DELETE FROM transactions WHERE id = ?", [id], callback);
  },
};

module.exports = Transaction;
