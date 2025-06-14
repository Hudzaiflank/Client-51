const model = require("../models/paymentModel");

const getPayments = (req, res) => {
  model.getAllPayments((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

const getPayment = (req, res) => {
  model.getPaymentById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length) return res.status(404).json({ message: "Not found" });
    res.json(result[0]);
  });
};

const addPayment = (req, res) => {
  const { user_id, va_number } = req.body;
  if (!user_id || !va_number) {
    return res
      .status(400)
      .json({ message: "user_id dan va_number wajib diisi" });
  }

  model.createPayment({ user_id, va_number }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Payment diproses", result });
  });
};

const updatePayment = (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  model.updatePayment(id, { description }, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Deskripsi payment diperbarui" });
  });
};

const deletePayment = (req, res) => {
  model.deletePayment(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Payment dihapus" });
  });
};

module.exports = {
  getPayments,
  getPayment,
  addPayment,
  updatePayment,
  deletePayment,
};
