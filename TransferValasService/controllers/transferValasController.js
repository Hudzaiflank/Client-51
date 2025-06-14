const TransferValas = require("../models/transferValasModel");

exports.getAllTransfers = (req, res) => {
  TransferValas.getAll((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.getTransferById = (req, res) => {
  TransferValas.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length) return res.status(404).json({ message: "Not found" });
    res.json(result[0]);
  });
};

exports.createTransfer = (req, res) => {
  TransferValas.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.updateTransfer = (req, res) => {
  TransferValas.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Transfer updated" });
  });
};

exports.deleteTransfer = (req, res) => {
  TransferValas.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Transfer deleted" });
  });
};
