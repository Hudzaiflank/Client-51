const { transactionDB, userDB } = require("../db");

const resolvers = {
  Query: {
    transactions: (_, __) => {
      return new Promise((resolve, reject) => {
        transactionDB.query("SELECT * FROM transactions", (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    },
    transaction: (_, { id }) => {
      return new Promise((resolve, reject) => {
        transactionDB.query(
          "SELECT * FROM transactions WHERE id = ?",
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
    addTransaction: (_, { sender_id, recipient_id, amount, note }) => {
      return new Promise((resolve, reject) => {
        // Step 1: cek saldo sender
        userDB.query(
          "SELECT balance FROM users WHERE id = ?",
          [sender_id],
          (err, result) => {
            if (err) return reject(err);

            const saldo = result[0]?.balance || 0;

            const status = saldo >= amount ? "success" : "failed";

            if (status === "success") {
              userDB.query(
                "UPDATE users SET balance = balance - ? WHERE id = ?",
                [amount, sender_id]
              );
              userDB.query(
                "UPDATE users SET balance = balance + ? WHERE id = ?",
                [amount, recipient_id]
              );
            }

            transactionDB.query(
              "INSERT INTO transactions (sender_id, recipient_id, amount, note, status) VALUES (?, ?, ?, ?, ?)",
              [sender_id, recipient_id, amount, note, status],
              (err, result) => {
                if (err) return reject(err);
                transactionDB.query(
                  "SELECT * FROM transactions WHERE id = ?",
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

    updateTransaction: (_, { id, note }) => {
      return new Promise((resolve, reject) => {
        transactionDB.query(
          "UPDATE transactions SET note = ? WHERE id = ?",
          [note, id],
          (err) => {
            if (err) return reject(err);
            transactionDB.query(
              "SELECT * FROM transactions WHERE id = ?",
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

    deleteTransaction: (_, { id }) => {
      return new Promise((resolve, reject) => {
        transactionDB.query(
          "DELETE FROM transactions WHERE id = ?",
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
