const model = require("../models/transactionModel");

const getTransactions = (req, res) => {
  model.getAllTransactions((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

const getTransaction = (req, res) => {
  const id = req.params.id;
  model.getTransactionById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json(result[0]);
  });
};

const addTransaction = (req, res) => {
  const { sender_account, recipient_account, amount, note } = req.body;
  if (!sender_account || !recipient_account || !amount) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  model.createTransaction(
    { sender_account, recipient_account, amount, note },
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Transaction processed", result });
    }
  );
};

const updateTransaction = (req, res) => {
  const id = req.params.id;
  model.updateTransaction(id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Transaction note updated" });
  });
};

const deleteTransaction = (req, res) => {
  const id = req.params.id;
  model.deleteTransaction(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Transaction deleted" });
  });
};

module.exports = {
  getTransactions,
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
