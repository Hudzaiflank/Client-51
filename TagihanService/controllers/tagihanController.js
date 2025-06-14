const model = require("../models/tagihanModel");

const getTagihans = (req, res) => {
  model.getAllTagihan((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

const getTagihan = (req, res) => {
  model.getTagihanById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json(result[0]);
  });
};

const createManual = (req, res) => {
  const { user_id, amount, description } = req.body;
  if (!user_id || !amount || !description) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  model.createTagihanManual({ user_id, amount, description }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res
      .status(201)
      .json({ message: "Tagihan manual dibuat dan akan berulang", result });
  });
};

const createRecurring = (req, res) => {
  const { amount, description } = req.body;

  if (!amount || !description) {
    return res
      .status(400)
      .json({ message: "Amount dan description wajib diisi" });
  }

  model.getAllUsers((err, users) => {
    if (err) return res.status(500).json({ error: err });

    let count = 0;

    users.forEach((u) => {
      model.createRecurringTagihanCustom(u.id, amount, description, () => {
        count++;
        if (count === users.length) {
          res.json({
            message: "Tagihan berhasil dibuat ke semua user",
            total: count,
          });
        }
      });
    });
  });
};

const updateTagihan = (req, res) => {
  model.updateTagihan(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Tagihan diupdate" });
  });
};

const deleteTagihan = (req, res) => {
  model.deleteTagihan(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Tagihan dihapus" });
  });
};

module.exports = {
  getTagihans,
  getTagihan,
  createManual,
  createRecurring,
  updateTagihan,
  deleteTagihan,
};
