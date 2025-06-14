const db = require("../db");

// fungsi generator account_number 10 digit unik
const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

const resolvers = {
  Query: {
    users: () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users", (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
    },

    user: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
          if (err) reject(err);
          else resolve(results[0]);
        });
      });
    },
  },

  Mutation: {
    addUser: (_, { name, email, password }) => {
      return new Promise((resolve, reject) => {
        const account_number = generateAccountNumber();
        const balance = 50000;

        db.query(
          "INSERT INTO users (name, email, password, account_number, balance) VALUES (?, ?, ?, ?, ?)",
          [name, email, password, account_number, balance],
          (err, result) => {
            if (err) reject(err);
            else {
              db.query(
                "SELECT * FROM users WHERE id = ?",
                [result.insertId],
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

    updateUser: (_, { id, name, email, password }) => {
      return new Promise((resolve, reject) => {
        db.query(
          "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
          [name, email, password, id],
          (err) => {
            if (err) reject(err);
            else {
              db.query(
                "SELECT * FROM users WHERE id = ?",
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

    deleteUser: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
          if (err) reject(false);
          else resolve(result.affectedRows > 0);
        });
      });
    },
  },
};

module.exports = resolvers;
