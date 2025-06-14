const db = require("../db");

const resolvers = {
  Query: {
    topups: () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM topups", (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
    },
    topup: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM topups WHERE id = ?", [id], (err, results) => {
          if (err) reject(err);
          else resolve(results[0]);
        });
      });
    },
  },

  Mutation: {
    addTopup: (_, args) => {
      const { user_id, amount, payment_method, status = "success" } = args;
      return new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO topups (user_id, amount, payment_method, status) VALUES (?, ?, ?, ?)",
          [user_id, amount, payment_method, status],
          (err, result) => {
            if (err) reject(err);
            else {
              resolve({
                id: result.insertId,
                user_id,
                amount,
                payment_method,
                status,
              });
            }
          }
        );
      });
    },

    updateTopup: (_, args) => {
      const { id, user_id, amount, payment_method, status } = args;
      return new Promise((resolve, reject) => {
        db.query(
          "UPDATE topups SET user_id = ?, amount = ?, payment_method = ?, status = ? WHERE id = ?",
          [user_id, amount, payment_method, status, id],
          (err) => {
            if (err) reject(err);
            else resolve(args);
          }
        );
      });
    },

    deleteTopup: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.query("DELETE FROM topups WHERE id = ?", [id], (err) => {
          if (err) reject(err);
          else resolve("Topup deleted successfully");
        });
      });
    },
  },
};

module.exports = resolvers;
