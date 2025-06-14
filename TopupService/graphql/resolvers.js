const { topupDB, userDB } = require("../db");

const resolvers = {
  Query: {
    topups: async () => {
      const [rows] = await topupDB.query("SELECT * FROM topups");
      return rows;
    },

    topup: async (_, { id }) => {
      const [rows] = await topupDB.query("SELECT * FROM topups WHERE id = ?", [
        id,
      ]);
      return rows[0];
    },
  },

  Mutation: {
    addTopup: async (_, { user_id, amount, payment_method }) => {
      const [result] = await topupDB.query(
        "INSERT INTO topups (user_id, amount, payment_method) VALUES (?, ?, ?)",
        [user_id, amount, payment_method]
      );

      await userDB.query(
        "UPDATE users SET balance = balance + ? WHERE id = ?",
        [amount, user_id]
      );

      const [rows] = await topupDB.query("SELECT * FROM topups WHERE id = ?", [
        result.insertId,
      ]);
      return rows[0];
    },

    updateTopup: async (_, { id, amount, payment_method }) => {
      await topupDB.query(
        "UPDATE topups SET amount = ?, payment_method = ? WHERE id = ?",
        [amount, payment_method, id]
      );
      const [rows] = await topupDB.query("SELECT * FROM topups WHERE id = ?", [
        id,
      ]);
      return rows[0];
    },

    deleteTopup: async (_, { id }) => {
      const [result] = await topupDB.query("DELETE FROM topups WHERE id = ?", [
        id,
      ]);
      return result.affectedRows > 0;
    },
  },
};

module.exports = resolvers;
