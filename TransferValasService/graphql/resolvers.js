const { valasDB, userDB } = require("../db");

const resolvers = {
  Query: {
    valasTransfers: async () => {
      const [rows] = await valasDB.query("SELECT * FROM transfer_valas");
      return rows;
    },

    valasTransfer: async (_, { id }) => {
      const [rows] = await valasDB.query(
        "SELECT * FROM transfer_valas WHERE id = ?",
        [id]
      );
      return rows[0];
    },
  },

  Mutation: {
    addValasTransfer: async (
      _,
      {
        user_id,
        account_number,
        recipient_bank,
        currency,
        exchange_rate,
        amount_idr,
      }
    ) => {
      const amount_valas = parseFloat((amount_idr / exchange_rate).toFixed(2));

      // Check user balance
      const [userRows] = await userDB.query(
        "SELECT balance FROM users WHERE id = ?",
        [user_id]
      );
      const saldo = userRows[0]?.balance || 0;
      const status = saldo >= amount_idr ? "success" : "failed";

      if (status === "success") {
        try {
          // Mulai transaksi
          await userDB.query("START TRANSACTION");

          // 1. Kurangi saldo pengirim
          await userDB.query(
            "UPDATE users SET balance = balance - ? WHERE id = ?",
            [amount_idr, user_id]
          );

          // 2. Cari user dengan account_number yang sama
          const [recipientRows] = await userDB.query(
            "SELECT id FROM users WHERE account_number = ?",
            [account_number]
          );

          // 3. Tambahkan saldo ke penerima jika ditemukan
          if (recipientRows && recipientRows.length > 0) {
            await userDB.query(
              "UPDATE users SET balance = balance + ? WHERE id = ?",
              [amount_idr, recipientRows[0].id]
            );
            console.log(`Balance added to recipient: ${recipientRows[0].id}`);
          } else {
            console.log(
              `Recipient with account number ${account_number} not found`
            );
          }

          // Commit transaksi
          await userDB.query("COMMIT");
          console.log("Transaction committed successfully");
        } catch (error) {
          // Rollback jika ada error
          await userDB.query("ROLLBACK");
          console.error("Error in transaction:", error);
          throw error;
        }
      }

      // Catat transaksi ke database
      const [insertResult] = await valasDB.query(
        `INSERT INTO transfer_valas 
        (user_id, account_number, recipient_bank, currency, exchange_rate, amount_idr, amount_valas, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user_id,
          account_number,
          recipient_bank,
          currency,
          exchange_rate,
          amount_idr,
          amount_valas,
          status,
        ]
      );

      const [rows] = await valasDB.query(
        "SELECT * FROM transfer_valas WHERE id = ?",
        [insertResult.insertId]
      );
      return rows[0];
    },

    updateValasRecipientBank: async (_, { id, recipient_bank }) => {
      await valasDB.query(
        "UPDATE transfer_valas SET recipient_bank = ? WHERE id = ?",
        [recipient_bank, id]
      );
      const [rows] = await valasDB.query(
        "SELECT * FROM transfer_valas WHERE id = ?",
        [id]
      );
      return rows[0];
    },

    deleteValasTransfer: async (_, { id }) => {
      const [result] = await valasDB.query(
        "DELETE FROM transfer_valas WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0;
    },
  },
};

module.exports = resolvers;
