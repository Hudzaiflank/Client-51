const Tagihan = require("../models/tagihanModel");

exports.getAllTagihans = (req, res) => {
  Tagihan.getAll((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.getTagihanById = (req, res) => {
  Tagihan.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length) return res.status(404).json({ message: "Not found" });
    res.json(result[0]);
  });
};

// setiap tagihan akan memiliki nomor VA unik
exports.createTagihan = (req, res) => {
  const { user_id, amount, description, status } = req.body;

  // generate VA number otomatis
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const uniqueSuffix = String(Date.now()).slice(-4); // 4 digit terakhir timestamp
  const va_number = `8800${user_id}${month}${uniqueSuffix}`;

  const newTagihan = {
    user_id,
    va_number,
    amount,
    description,
    status: status || "pending",
  };

  Tagihan.create(newTagihan, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...newTagihan });
  });
};

exports.updateTagihan = (req, res) => {
  const { user_id, amount, description, status } = req.body;

  const id = req.params.id;

  Tagihan.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length)
      return res.status(404).json({ message: "Tagihan not found" });

    const existingTagihan = result[0];

    const updatedTagihan = {
      user_id,
      va_number: existingTagihan.va_number, // JANGAN DIUBAH
      amount,
      description,
      status,
    };

    Tagihan.update(id, updatedTagihan, (err2) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json({ message: "Tagihan updated", data: updatedTagihan });
    });
  });
};

exports.deleteTagihan = (req, res) => {
  Tagihan.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Tagihan deleted" });
  });
};
