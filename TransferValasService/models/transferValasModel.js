const db = require("../db");

const TransferValas = {
  getAll: (cb) => db.query("SELECT * FROM transfer_valas", cb),

  getById: (id, cb) =>
    db.query("SELECT * FROM transfer_valas WHERE id = ?", [id], cb),

  create: (data, cb) => {
    const {
      user_id,
      account_number,
      recipient_bank,
      currency,
      amount_idr,
      exchange_rate,
      amount_valas,
    } = data;
    db.query(
      "INSERT INTO transfer_valas (user_id, account_number, recipient_bank, currency, amount_idr, exchange_rate, amount_valas) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        user_id,
        account_number,
        recipient_bank,
        currency,
        amount_idr,
        exchange_rate,
        amount_valas,
      ],
      cb
    );
  },

  update: (id, data, cb) => {
    const {
      user_id,
      account_number,
      recipient_bank,
      currency,
      amount_idr,
      exchange_rate,
      amount_valas,
    } = data;
    db.query(
      "UPDATE transfer_valas SET user_id = ?, account_number = ?, recipient_bank = ?, currency = ?, amount_idr = ?, exchange_rate = ?, amount_valas = ? WHERE id = ?",
      [
        user_id,
        account_number,
        recipient_bank,
        currency,
        amount_idr,
        exchange_rate,
        amount_valas,
        id,
      ],
      cb
    );
  },

  delete: (id, cb) =>
    db.query("DELETE FROM transfer_valas WHERE id = ?", [id], cb),
};

module.exports = TransferValas;
