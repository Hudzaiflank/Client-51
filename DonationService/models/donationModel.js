const db = require("../db");

const Donation = {
  getAll: (cb) => db.query("SELECT * FROM donations", cb),

  getById: (id, cb) =>
    db.query("SELECT * FROM donations WHERE id = ?", [id], cb),

  create: (data, cb) => {
    const { user_id, donation_target, amount } = data;
    db.query(
      "INSERT INTO donations (user_id, donation_target, amount) VALUES (?, ?, ?)",
      [user_id, donation_target, amount],
      cb
    );
  },

  update: (id, data, cb) => {
    const { user_id, donation_target, amount } = data;
    db.query(
      "UPDATE donations SET user_id = ?, donation_target = ?, amount = ? WHERE id = ?",
      [user_id, donation_target, amount, id],
      cb
    );
  },

  delete: (id, cb) => db.query("DELETE FROM donations WHERE id = ?", [id], cb),
};

module.exports = Donation;
