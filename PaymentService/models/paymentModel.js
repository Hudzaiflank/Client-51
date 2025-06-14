const { paymentDB, userDB, tagihanDB } = require("../db");

const createPayment = (data, cb) => {
  const { user_id, va_number } = data;

  // Step 1: cari tagihan
  tagihanDB.query(
    'SELECT * FROM tagihans WHERE va_number = ? AND status = "pending"',
    [va_number],
    (err, tagihans) => {
      if (err) return cb(err);
      if (tagihans.length === 0) {
        return cb(null, {
          result: "Tagihan tidak ditemukan atau sudah dibayar",
          status: "failed",
        });
      }

      const tagihan = tagihans[0];

      // Step 2: cek saldo
      userDB.query(
        "SELECT balance FROM users WHERE id = ?",
        [user_id],
        (err2, users) => {
          if (err2) return cb(err2);
          const user = users[0];
          if (!user || user.balance < tagihan.amount) {
            // saldo kurang
            const fail = `INSERT INTO payments (user_id, va_number, amount, description, status) VALUES (?, ?, ?, ?, 'failed')`;
            return paymentDB.query(
              fail,
              [user_id, va_number, tagihan.amount, tagihan.description],
              (e) => {
                if (e) return cb(e);
                cb(null, { result: "Saldo tidak cukup", status: "failed" });
              }
            );
          }

          // Step 3: kurangi saldo & update tagihan
          userDB.query("UPDATE users SET balance = balance - ? WHERE id = ?", [
            tagihan.amount,
            user_id,
          ]);
          tagihanDB.query(
            'UPDATE tagihans SET status = "paid" WHERE va_number = ?',
            [va_number]
          );

          // Step 4: simpan ke payments
          const query = `INSERT INTO payments (user_id, va_number, amount, description, status) VALUES (?, ?, ?, ?, 'success')`;
          paymentDB.query(
            query,
            [user_id, va_number, tagihan.amount, tagihan.description],
            cb
          );
        }
      );
    }
  );
};

const getAllPayments = (cb) => {
  paymentDB.query("SELECT * FROM payments", cb);
};

const getPaymentById = (id, cb) => {
  paymentDB.query("SELECT * FROM payments WHERE id = ?", [id], cb);
};

const updatePayment = (id, data, cb) => {
  paymentDB.query(
    "UPDATE payments SET description = ? WHERE id = ?",
    [data.description, id],
    cb
  );
};

const deletePayment = (id, cb) => {
  paymentDB.query("DELETE FROM payments WHERE id = ?", [id], cb);
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
