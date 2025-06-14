const Donation = require("../models/donationModel");

exports.getAllDonations = (req, res) => {
  Donation.getAll((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.getDonationById = (req, res) => {
  Donation.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length) return res.status(404).json({ message: "Not found" });
    res.json(result[0]);
  });
};

exports.createDonation = (req, res) => {
  Donation.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.updateDonation = (req, res) => {
  Donation.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Donation updated" });
  });
};

exports.deleteDonation = (req, res) => {
  Donation.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Donation deleted" });
  });
};
