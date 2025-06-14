const db = require("../db");

const getAllUsers = (cb) => {
  db.query("SELECT * FROM users", cb);
};

const getUserById = (id, cb) => {
  db.query("SELECT * FROM users WHERE id = ?", [id], cb);
};

const createUser = (data, cb) => {
  const query =
    "INSERT INTO users (name, email, password, account_number, balance) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [data.name, data.email, data.password, data.account_number, 0],
    cb
  );
};

const updateUser = (id, data, cb) => {
  const query =
    "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
  db.query(query, [data.name, data.email, data.password, id], cb);
};

const deleteUser = (id, cb) => {
  db.query("DELETE FROM users WHERE id = ?", [id], cb);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
