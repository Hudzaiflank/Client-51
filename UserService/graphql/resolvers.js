const db = require("../db");

const generateAccountNumber = () => {
  const random = Math.floor(10000 + Math.random() * 90000); // 5 digit random
  return "88" + random.toString(); // misal: 8812345
};

const resolvers = {
  Query: {
    users: (_, __) => {
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
    addUser: (_, args) => {
      const { name, email, password, balance } = args;
      const account_number = generateAccountNumber();

      return new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO users (name, email, password, account_number, balance) VALUES (?, ?, ?, ?, ?)",
          [name, email, password, account_number, balance],
          (err, result) => {
            if (err) reject(err);
            else {
              resolve({
                id: result.insertId,
                name,
                email,
                password,
                account_number,
                balance,
              });
            }
          }
        );
      });
    },

    updateUser: (_, args) => {
      const { id, name, email, password, account_number, balance } = args;
      return new Promise((resolve, reject) => {
        db.query(
          "UPDATE users SET name = ?, email = ?, password = ?, account_number = ?, balance = ? WHERE id = ?",
          [name, email, password, account_number, balance, id],
          (err) => {
            if (err) reject(err);
            else {
              resolve(args); // return updated data
            }
          }
        );
      });
    },

    deleteUser: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
          if (err) reject(err);
          else resolve("User deleted successfully");
        });
      });
    },
  },
};

module.exports = resolvers;
