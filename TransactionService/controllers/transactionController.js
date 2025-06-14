const Transaction = require("../models/transactionModel");

exports.getAllTransactions = (req, res) => {
  Transaction.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getTransactionById = (req, res) => {
  Transaction.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json(result[0]);
  });
};

exports.createTransaction = (req, res) => {
  Transaction.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.updateTransaction = (req, res) => {
  Transaction.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Transaction updated" });
  });
};

exports.deleteTransaction = (req, res) => {
  Transaction.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Transaction deleted" });
  });
};
