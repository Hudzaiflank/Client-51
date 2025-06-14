const { tagihanDB, userDB } = require("../db");
const generateVa = require("../utils/generateVa");

const resolvers = {
  Query: {
    tagihans: async () => {
      const [rows] = await tagihanDB.query("SELECT * FROM tagihans");
      return rows;
    },

    tagihan: async (_, { id }) => {
      const [rows] = await tagihanDB.query(
        "SELECT * FROM tagihans WHERE id = ?",
        [id]
      );
      return rows[0];
    },
  },

  Mutation: {
    createTagihanManual: async (_, { user_id, amount, description }) => {
      const va = generateVa(user_id);
      const [insertResult] = await tagihanDB.query(
        `INSERT INTO tagihans (user_id, va_number, amount, description, status) 
         VALUES (?, ?, ?, ?, 'pending')`,
        [user_id, va, amount, description]
      );

      const [rows] = await tagihanDB.query(
        "SELECT * FROM tagihans WHERE id = ?",
        [insertResult.insertId]
      );
      return rows[0];
    },

    createTagihanRecurring: async (_, { amount, description }) => {
      const [users] = await userDB.query("SELECT id FROM users");

      const promises = users.map((user) => {
        const va = generateVa(user.id);
        return tagihanDB.query(
          `INSERT INTO tagihans (user_id, va_number, amount, description, status) 
           VALUES (?, ?, ?, ?, 'pending')`,
          [user.id, va, amount, description]
        );
      });

      await Promise.all(promises);
      return "Tagihan berhasil dibuat ke semua user";
    },

    updateTagihan: async (_, { id, amount, description }) => {
      await tagihanDB.query(
        "UPDATE tagihans SET description = ?, amount = ? WHERE id = ?",
        [description, amount, id]
      );

      const [rows] = await tagihanDB.query(
        "SELECT * FROM tagihans WHERE id = ?",
        [id]
      );
      return rows[0];
    },

    deleteTagihan: async (_, { id }) => {
      const [result] = await tagihanDB.query(
        "DELETE FROM tagihans WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0;
    },
  },
};

module.exports = resolvers;
