const { donationDB, userDB } = require("../db");

const resolvers = {
  Query: {
    donations: async () => {
      const [rows] = await donationDB.query("SELECT * FROM donations");
      return rows;
    },

    donation: async (_, { id }) => {
      const [rows] = await donationDB.query(
        "SELECT * FROM donations WHERE donation_id = ?",
        [id]
      );
      return rows[0];
    },
  },

  Mutation: {
    createDonation: async (_, { user_id, amount, description }) => {
      const [users] = await userDB.query(
        "SELECT balance FROM users WHERE id = ?",
        [user_id]
      );
      if (users.length === 0) {
        throw new Error("User not found");
      }

      const user = users[0];
      if (user.balance < amount) {
        throw new Error("Insufficient balance");
      }

      // Kurangi saldo user
      await userDB.query(
        "UPDATE users SET balance = balance - ? WHERE id = ?",
        [amount, user_id]
      );

      // Simpan donasi
      const [result] = await donationDB.query(
        "INSERT INTO donations (user_id, amount, description) VALUES (?, ?, ?)",
        [user_id, amount, description]
      );

      return {
        message: "Donation successful",
        donation_id: result.insertId,
      };
    },

    updateDonation: async (_, { id, description }) => {
      await donationDB.query(
        "UPDATE donations SET description = ? WHERE donation_id = ?",
        [description, id]
      );
      const [rows] = await donationDB.query(
        "SELECT * FROM donations WHERE donation_id = ?",
        [id]
      );
      return rows[0];
    },

    deleteDonation: async (_, { id }) => {
      const [result] = await donationDB.query(
        "DELETE FROM donations WHERE donation_id = ?",
        [id]
      );
      return result.affectedRows > 0;
    },
  },
};

module.exports = resolvers;
