const model = require("../models/valasModel");

const getTransfers = (req, res) => {
  model.getAllTransfers((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

const getTransfer = (req, res) => {
  const id = req.params.id;
  model.getTransferById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json(result[0]);
  });
};

const addTransfer = (req, res) => {
  const {
    user_id,
    account_number,
    recipient_bank,
    currency,
    amount_idr,
    exchange_rate,
  } = req.body;

  if (
    !user_id ||
    !account_number ||
    !recipient_bank ||
    !currency ||
    !amount_idr ||
    !exchange_rate
  ) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  model.createTransfer(
    {
      user_id,
      account_number,
      recipient_bank,
      currency,
      amount_idr,
      exchange_rate,
    },
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Transfer valas processed", result });
    }
  );
};

const updateTransfer = (req, res) => {
  const id = req.params.id;
  const { recipient_bank } = req.body;
  model.updateNote(id, { recipient_bank }, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Recipient bank updated" });
  });
};

const deleteTransfer = (req, res) => {
  const id = req.params.id;
  model.deleteTransfer(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Transfer deleted" });
  });
};

module.exports = {
  getTransfers,
  getTransfer,
  addTransfer,
  updateTransfer,
  deleteTransfer,
};
