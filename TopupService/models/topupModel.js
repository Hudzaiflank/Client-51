const { topupDB, userDB } = require("../db");

const getAllTopups = (cb) => {
  topupDB.query("SELECT * FROM topups", cb);
};

const getTopupById = (id, cb) => {
  topupDB.query("SELECT * FROM topups WHERE id = ?", [id], cb);
};

const createTopup = (data, cb) => {
  const { user_id, amount, payment_method, status } = data;
  const query =
    "INSERT INTO topups (user_id, amount, payment_method, status) VALUES (?, ?, ?, ?)";
  topupDB.query(
    query,
    [user_id, amount, payment_method, status],
    (err, result) => {
      if (err) return cb(err);

      if (status === "success") {
        const update = "UPDATE users SET balance = balance + ? WHERE id = ?";
        userDB.query(update, [amount, user_id], (err2) => {
          if (err2) return cb(err2);
          cb(null, result);
        });
      } else {
        cb(null, result);
      }
    }
  );
};

const updateTopup = (id, data, cb) => {
  const { amount, payment_method, status } = data;
  const query =
    "UPDATE topups SET amount = ?, payment_method = ?, status = ? WHERE id = ?";
  topupDB.query(query, [amount, payment_method, status, id], cb);
};

const deleteTopup = (id, cb) => {
  topupDB.query("DELETE FROM topups WHERE id = ?", [id], cb);
};

module.exports = {
  getAllTopups,
  getTopupById,
  createTopup,
  updateTopup,
  deleteTopup,
};
