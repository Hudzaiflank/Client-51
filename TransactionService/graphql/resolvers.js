const { transactionDB, userDB } = require("../db");

const resolvers = {
  Query: {
    transactions: async () => {
      const [rows] = await transactionDB.query("SELECT * FROM transactions");
      return rows;
    },

    transaction: async (_, { id }) => {
      const [rows] = await transactionDB.query(
        "SELECT * FROM transactions WHERE id = ?",
        [id]
      );
      return rows[0];
    },
  },

  Mutation: {
    addTransaction: async (_, { sender_id, recipient_id, amount, note }) => {
      const [senderRows] = await userDB.query(
        "SELECT balance FROM users WHERE id = ?",
        [sender_id]
      );
      const saldo = senderRows[0]?.balance || 0;

      const status = saldo >= amount ? "success" : "failed";

      if (status === "success") {
        await userDB.query(
          "UPDATE users SET balance = balance - ? WHERE id = ?",
          [amount, sender_id]
        );
        await userDB.query(
          "UPDATE users SET balance = balance + ? WHERE id = ?",
          [amount, recipient_id]
        );
      }

      const [insertResult] = await transactionDB.query(
        "INSERT INTO transactions (sender_id, recipient_id, amount, note, status) VALUES (?, ?, ?, ?, ?)",
        [sender_id, recipient_id, amount, note, status]
      );

      const [newRows] = await transactionDB.query(
        "SELECT * FROM transactions WHERE id = ?",
        [insertResult.insertId]
      );
      return newRows[0];
    },

    updateTransaction: async (_, { id, note }) => {
      await transactionDB.query(
        "UPDATE transactions SET note = ? WHERE id = ?",
        [note, id]
      );
      const [updatedRows] = await transactionDB.query(
        "SELECT * FROM transactions WHERE id = ?",
        [id]
      );
      return updatedRows[0];
    },

    deleteTransaction: async (_, { id }) => {
      const [result] = await transactionDB.query(
        "DELETE FROM transactions WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0;
    },
  },
};

module.exports = resolvers;
