const Payment = require("../models/paymentModel");

exports.getAllPayments = (req, res) => {
  Payment.getAll((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.getPaymentById = (req, res) => {
  Payment.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length) return res.status(404).json({ message: "Not found" });
    res.json(result[0]);
  });
};

exports.createPayment = (req, res) => {
  Payment.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.updatePayment = (req, res) => {
  Payment.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Payment updated" });
  });
};

exports.deletePayment = (req, res) => {
  Payment.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Payment deleted" });
  });
};
