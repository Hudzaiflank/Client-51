const db = require("../db").promise(); // gunakan promise untuk async/await

// Fungsi generator nomor akun 10 digit unik
const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

const resolvers = {
  Query: {
    users: async () => {
      const [rows] = await db.query("SELECT * FROM users");
      return rows;
    },

    user: async (_, { id }) => {
      const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0];
    },
  },

  Mutation: {
    addUser: async (_, { name, email, password }) => {
      const account_number = generateAccountNumber();
      const balance = 50000;

      const [result] = await db.query(
        "INSERT INTO users (name, email, password, account_number, balance) VALUES (?, ?, ?, ?, ?)",
        [name, email, password, account_number, balance]
      );

      const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [
        result.insertId,
      ]);
      return rows[0];
    },

    updateUser: async (_, { id, name, email, password }) => {
      await db.query(
        "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
        [name, email, password, id]
      );

      const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0];
    },

    deleteUser: async (_, { id }) => {
      const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
      return result.affectedRows > 0;
    },
  },
};

module.exports = resolvers;
