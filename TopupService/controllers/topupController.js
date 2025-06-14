const topupModel = require("../models/topupModel");

const getTopups = (req, res) => {
  topupModel.getAllTopups((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

const getTopup = (req, res) => {
  const id = req.params.id;
  topupModel.getTopupById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Topup not found" });
    res.json(result[0]);
  });
};

const addTopup = (req, res) => {
  const { user_id, amount, payment_method, status } = req.body;
  if (!user_id || !amount || !payment_method || !status) {
    return res.status(400).json({ message: "Incomplete data" });
  }

  topupModel.createTopup(
    { user_id, amount, payment_method, status },
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Topup created", result });
    }
  );
};

const updateTopup = (req, res) => {
  const id = req.params.id;
  const { amount, payment_method, status } = req.body;
  topupModel.updateTopup(
    id,
    { amount, payment_method, status },
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Topup updated" });
    }
  );
};

const deleteTopup = (req, res) => {
  const id = req.params.id;
  topupModel.deleteTopup(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Topup deleted" });
  });
};

module.exports = {
  getTopups,
  getTopup,
  addTopup,
  updateTopup,
  deleteTopup,
};
