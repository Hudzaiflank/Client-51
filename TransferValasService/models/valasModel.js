const { valasDB, userDB } = require("../db");

const getAllTransfers = (cb) => {
  valasDB.query("SELECT * FROM transfer_valas", cb);
};

const getTransferById = (id, cb) => {
  valasDB.query("SELECT * FROM transfer_valas WHERE id = ?", [id], cb);
};

const createTransfer = (data, cb) => {
  const {
    user_id,
    account_number,
    recipient_bank,
    currency,
    amount_idr,
    exchange_rate,
  } = data;

  const amount_valas = (amount_idr / exchange_rate).toFixed(2);

  userDB.query(
    "SELECT balance FROM users WHERE id = ?",
    [user_id],
    (err, result) => {
      if (err) return cb(err);
      if (!result[0] || result[0].balance < amount_idr) {
        // saldo kurang
        return valasDB.query(
          "INSERT INTO transfer_valas (user_id, account_number, recipient_bank, currency, exchange_rate, amount_idr, amount_valas, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            user_id,
            account_number,
            recipient_bank,
            currency,
            exchange_rate,
            amount_idr,
            amount_valas,
            "failed",
          ],
          cb
        );
      }

      // saldo cukup
      userDB.query("UPDATE users SET balance = balance - ? WHERE id = ?", [
        amount_idr,
        user_id,
      ]);
      valasDB.query(
        "INSERT INTO transfer_valas (user_id, account_number, recipient_bank, currency, exchange_rate, amount_idr, amount_valas, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          user_id,
          account_number,
          recipient_bank,
          currency,
          exchange_rate,
          amount_idr,
          amount_valas,
          "success",
        ],
        cb
      );
    }
  );
};

const updateNote = (id, data, cb) => {
  valasDB.query(
    "UPDATE transfer_valas SET recipient_bank = ? WHERE id = ?",
    [data.recipient_bank, id],
    cb
  );
};

const deleteTransfer = (id, cb) => {
  valasDB.query("DELETE FROM transfer_valas WHERE id = ?", [id], cb);
};

module.exports = {
  getAllTransfers,
  getTransferById,
  createTransfer,
  updateNote,
  deleteTransfer,
};
