const { valasDB, userDB } = require("../db");

const resolvers = {
  Query: {
    valasTransfers: () => {
      return new Promise((resolve, reject) => {
        valasDB.query("SELECT * FROM transfer_valas", (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
    },

    valasTransfer: (_, { id }) => {
      return new Promise((resolve, reject) => {
        valasDB.query(
          "SELECT * FROM transfer_valas WHERE id = ?",
          [id],
          (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
          }
        );
      });
    },
  },

  Mutation: {
    addValasTransfer: (_, args) => {
      const {
        user_id,
        account_number,
        recipient_bank,
        currency,
        exchange_rate,
        amount_idr,
      } = args;

      const amount_valas = parseFloat((amount_idr / exchange_rate).toFixed(2));
      return new Promise((resolve, reject) => {
        userDB.query(
          "SELECT balance FROM users WHERE id = ?",
          [user_id],
          (err, results) => {
            if (err) return reject(err);
            const saldo = results[0]?.balance || 0;
            const status = saldo >= amount_idr ? "success" : "failed";

            if (status === "success") {
              userDB.query(
                "UPDATE users SET balance = balance - ? WHERE id = ?",
                [amount_idr, user_id]
              );
            }

            valasDB.query(
              `INSERT INTO transfer_valas 
              (user_id, account_number, recipient_bank, currency, exchange_rate, amount_idr, amount_valas, status) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                user_id,
                account_number,
                recipient_bank,
                currency,
                exchange_rate,
                amount_idr,
                amount_valas,
                status,
              ],
              (err, result) => {
                if (err) return reject(err);
                valasDB.query(
                  "SELECT * FROM transfer_valas WHERE id = ?",
                  [result.insertId],
                  (err, res) => {
                    if (err) reject(err);
                    else resolve(res[0]);
                  }
                );
              }
            );
          }
        );
      });
    },

    updateValasRecipientBank: (_, { id, recipient_bank }) => {
      return new Promise((resolve, reject) => {
        valasDB.query(
          "UPDATE transfer_valas SET recipient_bank = ? WHERE id = ?",
          [recipient_bank, id],
          (err) => {
            if (err) return reject(err);
            valasDB.query(
              "SELECT * FROM transfer_valas WHERE id = ?",
              [id],
              (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
              }
            );
          }
        );
      });
    },

    deleteValasTransfer: (_, { id }) => {
      return new Promise((resolve, reject) => {
        valasDB.query(
          "DELETE FROM transfer_valas WHERE id = ?",
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
