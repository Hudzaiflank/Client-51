const { donationDB, userDB } = require("../db");

const resolvers = {
  Query: {
    donations: () => {
      return new Promise((resolve, reject) => {
        donationDB.query("SELECT * FROM donations", (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    },

    donation: (_, { id }) => {
      return new Promise((resolve, reject) => {
        donationDB.query(
          "SELECT * FROM donations WHERE donation_id = ?",
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
    createDonation: (_, { user_id, amount, description }) => {
      return new Promise((resolve, reject) => {
        userDB.query(
          "SELECT balance FROM users WHERE id = ?",
          [user_id],
          (err, result) => {
            if (err || result.length === 0) {
              return reject(new Error("User not found"));
            }

            const balance = result[0].balance;

            if (balance < amount) {
              return reject(new Error("Insufficient balance"));
            }

            // Kurangi saldo user
            userDB.query(
              "UPDATE users SET balance = balance - ? WHERE id = ?",
              [amount, user_id]
            );

            // Simpan donasi
            donationDB.query(
              "INSERT INTO donations (user_id, amount, description) VALUES (?, ?, ?)",
              [user_id, amount, description],
              (err, result) => {
                if (err) return reject(err);
                resolve({
                  message: "Donation successful",
                  donation_id: result.insertId,
                });
              }
            );
          }
        );
      });
    },

    updateDonation: (_, { id, description }) => {
      return new Promise((resolve, reject) => {
        donationDB.query(
          "UPDATE donations SET description = ? WHERE donation_id = ?",
          [description, id],
          (err) => {
            if (err) return reject(err);
            donationDB.query(
              "SELECT * FROM donations WHERE donation_id = ?",
              [id],
              (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
              }
            );
          }
        );
      });
    },

    deleteDonation: (_, { id }) => {
      return new Promise((resolve, reject) => {
        donationDB.query(
          "DELETE FROM donations WHERE donation_id = ?",
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
