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
    addTransaction: async (
      _,
      { sender_account, recipient_account, amount, note }
    ) => {
      // Cari ID pengirim berdasarkan nomor rekening
      const [senderRows] = await userDB.query(
        "SELECT id, balance FROM users WHERE account_number = ?",
        [sender_account]
      );

      if (!senderRows[0]) {
        throw new Error("Akun pengirim tidak ditemukan");
      }

      const sender_id = senderRows[0].id;
      const saldo = senderRows[0].balance;

      // Cari ID penerima berdasarkan nomor rekening
      const [recipientRows] = await userDB.query(
        "SELECT id FROM users WHERE account_number = ?",
        [recipient_account]
      );

      if (!recipientRows[0]) {
        throw new Error("Akun penerima tidak ditemukan");
      }

      const recipient_id = recipientRows[0].id;
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
