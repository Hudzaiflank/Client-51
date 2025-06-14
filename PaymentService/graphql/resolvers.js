const { paymentDB, userDB, tagihanDB } = require("../db");

const resolvers = {
  Query: {
    payments: async () => {
      const [rows] = await paymentDB.query("SELECT * FROM payments");
      return rows;
    },

    payment: async (_, { id }) => {
      const [rows] = await paymentDB.query(
        "SELECT * FROM payments WHERE id = ?",
        [id]
      );
      return rows[0];
    },
  },

  Mutation: {
    createPayment: async (_, { user_id, va_number }) => {
      const [tagihans] = await tagihanDB.query(
        'SELECT * FROM tagihans WHERE va_number = ? AND status = "pending"',
        [va_number]
      );

      if (tagihans.length === 0) {
        return {
          result: "Tagihan tidak ditemukan atau sudah dibayar",
          status: "failed",
        };
      }

      const tagihan = tagihans[0];
      const [users] = await userDB.query(
        "SELECT balance FROM users WHERE id = ?",
        [user_id]
      );
      const user = users[0];

      if (!user || user.balance < tagihan.amount) {
        await paymentDB.query(
          `INSERT INTO payments (user_id, va_number, amount, description, status) 
           VALUES (?, ?, ?, ?, 'failed')`,
          [user_id, va_number, tagihan.amount, tagihan.description]
        );

        return {
          result: "Saldo tidak cukup",
          status: "failed",
        };
      }

      // Update saldo user
      await userDB.query(
        "UPDATE users SET balance = balance - ? WHERE id = ?",
        [tagihan.amount, user_id]
      );

      // Update status tagihan
      await tagihanDB.query(
        'UPDATE tagihans SET status = "paid" WHERE va_number = ?',
        [va_number]
      );

      // Simpan data payment
      await paymentDB.query(
        `INSERT INTO payments (user_id, va_number, amount, description, status) 
         VALUES (?, ?, ?, ?, 'success')`,
        [user_id, va_number, tagihan.amount, tagihan.description]
      );

      return {
        result: "Pembayaran berhasil",
        status: "success",
      };
    },

    updatePayment: async (_, { id, description }) => {
      await paymentDB.query(
        "UPDATE payments SET description = ? WHERE id = ?",
        [description, id]
      );
      const [rows] = await paymentDB.query(
        "SELECT * FROM payments WHERE id = ?",
        [id]
      );
      return rows[0];
    },

    deletePayment: async (_, { id }) => {
      const [result] = await paymentDB.query(
        "DELETE FROM payments WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0;
    },
  },
};

module.exports = resolvers;
