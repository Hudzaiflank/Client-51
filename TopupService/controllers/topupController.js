const Topup = require("../models/topupModel");

exports.getAllTopups = (req, res) => {
  Topup.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getTopupById = (req, res) => {
  Topup.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json(result[0]);
  });
};

exports.createTopup = (req, res) => {
  Topup.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.updateTopup = (req, res) => {
  Topup.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Topup updated" });
  });
};

exports.deleteTopup = (req, res) => {
  Topup.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Topup deleted" });
  });
};
