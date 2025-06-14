const { paymentDB, userDB, tagihanDB } = require("../db");

const resolvers = {
  Query: {
    payments: () => {
      return new Promise((resolve, reject) => {
        paymentDB.query("SELECT * FROM payments", (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    },

    payment: (_, { id }) => {
      return new Promise((resolve, reject) => {
        paymentDB.query(
          "SELECT * FROM payments WHERE id = ?",
          [id],
          (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
          }
        );
      });
    },
  },

  Mutation: {
    createPayment: (_, { user_id, va_number }) => {
      return new Promise((resolve, reject) => {
        tagihanDB.query(
          'SELECT * FROM tagihans WHERE va_number = ? AND status = "pending"',
          [va_number],
          (err, tagihans) => {
            if (err) return reject(err);
            if (tagihans.length === 0) {
              return resolve({
                result: "Tagihan tidak ditemukan atau sudah dibayar",
                status: "failed",
              });
            }

            const tagihan = tagihans[0];

            userDB.query(
              "SELECT balance FROM users WHERE id = ?",
              [user_id],
              (err2, users) => {
                if (err2) return reject(err2);
                const user = users[0];

                if (!user || user.balance < tagihan.amount) {
                  const fail = `INSERT INTO payments (user_id, va_number, amount, description, status) VALUES (?, ?, ?, ?, 'failed')`;
                  return paymentDB.query(
                    fail,
                    [user_id, va_number, tagihan.amount, tagihan.description],
                    (e) => {
                      if (e) return reject(e);
                      resolve({
                        result: "Saldo tidak cukup",
                        status: "failed",
                      });
                    }
                  );
                }

                // Kurangi saldo
                userDB.query(
                  "UPDATE users SET balance = balance - ? WHERE id = ?",
                  [tagihan.amount, user_id]
                );

                // Update tagihan jadi paid
                tagihanDB.query(
                  'UPDATE tagihans SET status = "paid" WHERE va_number = ?',
                  [va_number]
                );

                // Simpan payment success
                const query = `INSERT INTO payments (user_id, va_number, amount, description, status) VALUES (?, ?, ?, ?, 'success')`;
                paymentDB.query(
                  query,
                  [user_id, va_number, tagihan.amount, tagihan.description],
                  (err, result) => {
                    if (err) reject(err);
                    else
                      resolve({
                        result: "Pembayaran berhasil",
                        status: "success",
                      });
                  }
                );
              }
            );
          }
        );
      });
    },

    updatePayment: (_, { id, description }) => {
      return new Promise((resolve, reject) => {
        paymentDB.query(
          "UPDATE payments SET description = ? WHERE id = ?",
          [description, id],
          (err) => {
            if (err) return reject(err);
            paymentDB.query(
              "SELECT * FROM payments WHERE id = ?",
              [id],
              (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
              }
            );
          }
        );
      });
    },

    deletePayment: (_, { id }) => {
      return new Promise((resolve, reject) => {
        paymentDB.query(
          "DELETE FROM payments WHERE id = ?",
          [id],
          (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows > 0);
          }
        );
      });
    },
  },
};

module.exports = resolvers;
