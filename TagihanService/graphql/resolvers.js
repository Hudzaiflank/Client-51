const { tagihanDB, userDB } = require("../db");
const generateVa = require("../utils/generateVa");

const resolvers = {
  Query: {
    tagihans: () => {
      return new Promise((resolve, reject) => {
        tagihanDB.query("SELECT * FROM tagihans", (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    },

    tagihan: (_, { id }) => {
      return new Promise((resolve, reject) => {
        tagihanDB.query(
          "SELECT * FROM tagihans WHERE id = ?",
          [id],
          (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
          }
        );
      });
    },
  },

  Mutation: {
    createTagihanManual: (_, { user_id, amount, description }) => {
      const va = generateVa(user_id);
      return new Promise((resolve, reject) => {
        const query = `
          INSERT INTO tagihans (user_id, va_number, amount, description, status)
          VALUES (?, ?, ?, ?, 'pending')
        `;
        tagihanDB.query(
          query,
          [user_id, va, amount, description],
          (err, result) => {
            if (err) reject(err);
            else {
              tagihanDB.query(
                "SELECT * FROM tagihans WHERE id = ?",
                [result.insertId],
                (err, rows) => {
                  if (err) reject(err);
                  else resolve(rows[0]);
                }
              );
            }
          }
        );
      });
    },

    createTagihanRecurring: (_, { amount, description }) => {
      return new Promise((resolve, reject) => {
        userDB.query("SELECT id FROM users", (err, users) => {
          if (err) return reject("Gagal ambil data user");

          let count = 0;
          users.forEach((u) => {
            const va = generateVa(u.id);
            const query = `
              INSERT INTO tagihans (user_id, va_number, amount, description, status)
              VALUES (?, ?, ?, ?, 'pending')
            `;
            tagihanDB.query(query, [u.id, va, amount, description], (err) => {
              if (err) console.error("Gagal insert tagihan:", err); // log individual error
              count++;
              if (count === users.length) {
                resolve("Tagihan berhasil dibuat ke semua user");
              }
            });
          });
        });
      });
    },

    updateTagihan: (_, { id, amount, description }) => {
      return new Promise((resolve, reject) => {
        tagihanDB.query(
          "UPDATE tagihans SET description = ?, amount = ? WHERE id = ?",
          [description, amount, id],
          (err) => {
            if (err) return reject(err);
            tagihanDB.query(
              "SELECT * FROM tagihans WHERE id = ?",
              [id],
              (err, rows) => {
                if (err) reject(err);
                else resolve(rows[0]);
              }
            );
          }
        );
      });
    },

    deleteTagihan: (_, { id }) => {
      return new Promise((resolve, reject) => {
        tagihanDB.query(
          "DELETE FROM tagihans WHERE id = ?",
          [id],
          (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows > 0);
          }
        );
      });
    },
  },
};

module.exports = resolvers;
