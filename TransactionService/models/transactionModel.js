const { txDB, userDB } = require("../db");

const getAllTransactions = (cb) => {
  txDB.query("SELECT * FROM transactions", cb);
};

const getTransactionById = (id, cb) => {
  txDB.query("SELECT * FROM transactions WHERE id = ?", [id], cb);
};

const createTransaction = (data, cb) => {
  const { sender_id, recipient_id, amount, note } = data;

  // Step 1: cek saldo pengirim
  userDB.query(
    "SELECT balance FROM users WHERE id = ?",
    [sender_id],
    (err, result) => {
      if (err) return cb(err);
      if (!result[0] || result[0].balance < amount) {
        // saldo tidak cukup
        return txDB.query(
          "INSERT INTO transactions (sender_id, recipient_id, amount, note, status) VALUES (?, ?, ?, ?, ?)",
          [sender_id, recipient_id, amount, note, "failed"],
          cb
        );
      }

      // Step 2: update saldo sender dan recipient
      userDB.query("UPDATE users SET balance = balance - ? WHERE id = ?", [
        amount,
        sender_id,
      ]);
      userDB.query("UPDATE users SET balance = balance + ? WHERE id = ?", [
        amount,
        recipient_id,
      ]);

      // Step 3: simpan transaksi success
      txDB.query(
        "INSERT INTO transactions (sender_id, recipient_id, amount, note, status) VALUES (?, ?, ?, ?, ?)",
        [sender_id, recipient_id, amount, note, "success"],
        cb
      );
    }
  );
};

const updateTransaction = (id, data, cb) => {
  txDB.query(
    "UPDATE transactions SET note = ? WHERE id = ?",
    [data.note, id],
    cb
  );
};

const deleteTransaction = (id, cb) => {
  txDB.query("DELETE FROM transactions WHERE id = ?", [id], cb);
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
