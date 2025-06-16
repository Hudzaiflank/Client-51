const { txDB, userDB } = require("../db");

const getAllTransactions = (cb) => {
  txDB.query("SELECT * FROM transactions", cb);
};

const getTransactionById = (id, cb) => {
  txDB.query("SELECT * FROM transactions WHERE id = ?", [id], cb);
};

const createTransaction = (data, cb) => {
  const { sender_account, recipient_account, amount, note } = data;

  // Step 1: cari ID pengirim berdasarkan account number
  userDB.query(
    "SELECT id, balance FROM users WHERE account_number = ?",
    [sender_account],
    (err, senderResult) => {
      if (err) return cb(err);
      if (!senderResult[0]) {
        return cb(new Error("Sender account not found"));
      }

      const sender_id = senderResult[0].id;
      const sender_balance = senderResult[0].balance;

      // Step 2: cari ID penerima berdasarkan account number
      userDB.query(
        "SELECT id FROM users WHERE account_number = ?",
        [recipient_account],
        (err, recipientResult) => {
          if (err) return cb(err);
          if (!recipientResult[0]) {
            return cb(new Error("Recipient account not found"));
          }

          const recipient_id = recipientResult[0].id;

          // Step 3: cek saldo pengirim
          if (sender_balance < amount) {
            // saldo tidak cukup
            return txDB.query(
              "INSERT INTO transactions (sender_id, recipient_id, amount, note, status) VALUES (?, ?, ?, ?, ?)",
              [sender_id, recipient_id, amount, note, "failed"],
              cb
            );
          }

          // Step 4: update saldo sender dan recipient
          userDB.query("UPDATE users SET balance = balance - ? WHERE id = ?", [
            amount,
            sender_id,
          ]);
          userDB.query("UPDATE users SET balance = balance + ? WHERE id = ?", [
            amount,
            recipient_id,
          ]);

          // Step 5: simpan transaksi success
          txDB.query(
            "INSERT INTO transactions (sender_id, recipient_id, amount, note, status) VALUES (?, ?, ?, ?, ?)",
            [sender_id, recipient_id, amount, note, "success"],
            cb
          );
        }
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
