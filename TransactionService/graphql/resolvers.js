const db = require("../db");

const resolvers = {
  Query: {
    transactions: () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM transactions", (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
    },
    transaction: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM transactions WHERE id = ?",
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
    addTransaction: (_, args) => {
      const {
        sender_id,
        recipient_id,
        amount,
        note,
        status = "success",
      } = args;
      return new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO transactions (sender_id, recipient_id, amount, note, status) VALUES (?, ?, ?, ?, ?)",
          [sender_id, recipient_id, amount, note, status],
          (err, result) => {
            if (err) reject(err);
            else {
              resolve({
                id: result.insertId,
                sender_id,
                recipient_id,
                amount,
                note,
                status,
              });
            }
          }
        );
      });
    },

    updateTransaction: (_, args) => {
      const { id, sender_id, recipient_id, amount, note, status } = args;
      return new Promise((resolve, reject) => {
        db.query(
          "UPDATE transactions SET sender_id = ?, recipient_id = ?, amount = ?, note = ?, status = ? WHERE id = ?",
          [sender_id, recipient_id, amount, note, status, id],
          (err) => {
            if (err) reject(err);
            else resolve(args);
          }
        );
      });
    },

    deleteTransaction: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.query("DELETE FROM transactions WHERE id = ?", [id], (err) => {
          if (err) reject(err);
          else resolve("Transaction deleted successfully");
        });
      });
    },
  },
};

module.exports = resolvers;
