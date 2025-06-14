const { topupDB, userDB } = require("../db");

const resolvers = {
  Query: {
    topups: () => {
      return new Promise((resolve, reject) => {
        topupDB.query("SELECT * FROM topups", (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
    },

    topup: (_, { id }) => {
      return new Promise((resolve, reject) => {
        topupDB.query(
          "SELECT * FROM topups WHERE id = ?",
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
    addTopup: (_, { user_id, amount, payment_method }) => {
      return new Promise((resolve, reject) => {
        const query =
          "INSERT INTO topups (user_id, amount, payment_method) VALUES (?, ?, ?)";
        topupDB.query(
          query,
          [user_id, amount, payment_method],
          (err, result) => {
            if (err) return reject(err);

            // tambah saldo
            userDB.query(
              "UPDATE users SET balance = balance + ? WHERE id = ?",
              [amount, user_id],
              (err2) => {
                if (err2) return reject(err2);

                topupDB.query(
                  "SELECT * FROM topups WHERE id = ?",
                  [result.insertId],
                  (err3, rows) => {
                    if (err3) reject(err3);
                    else resolve(rows[0]);
                  }
                );
              }
            );
          }
        );
      });
    },

    updateTopup: (_, { id, amount, payment_method }) => {
      return new Promise((resolve, reject) => {
        topupDB.query(
          "UPDATE topups SET amount = ?, payment_method = ? WHERE id = ?",
          [amount, payment_method, id],
          (err) => {
            if (err) reject(err);
            else {
              topupDB.query(
                "SELECT * FROM topups WHERE id = ?",
                [id],
                (err2, rows) => {
                  if (err2) reject(err2);
                  else resolve(rows[0]);
                }
              );
            }
          }
        );
      });
    },

    deleteTopup: (_, { id }) => {
      return new Promise((resolve, reject) => {
        topupDB.query(
          "DELETE FROM topups WHERE id = ?",
          [id],
          (err, result) => {
            if (err) reject(false);
            else resolve(result.affectedRows > 0);
          }
        );
      });
    },
  },
};

module.exports = resolvers;
