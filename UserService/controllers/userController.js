const userModel = require("../models/userModel");
const generateAccountNumber = require("../utils/generateAccountNumber");

const getUsers = (req, res) => {
  userModel.getAllUsers((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

const getUser = (req, res) => {
  const id = req.params.id;
  userModel.getUserById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(result[0]);
  });
};

const createUser = (req, res) => {
  const data = req.body;
  data.account_number = generateAccountNumber();
  userModel.createUser(data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...data });
  });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  userModel.updateUser(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User updated" });
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  userModel.deleteUser(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User deleted" });
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
