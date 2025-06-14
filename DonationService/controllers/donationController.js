const { donationDB, userDB } = require("../db");
const Donation = require("../models/donationModel");

// POST /api/donations
exports.createDonation = (req, res) => {
  const { user_id, amount, description } = req.body;

  if (!user_id || !amount || !description) {
    return res.status(400).json({ error: "All fields required" });
  }

  // Step 1: Cek apakah user ada dan punya saldo cukup
  userDB.query(
    "SELECT balance FROM users WHERE id = ?",
    [user_id],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const balance = results[0].balance;

      if (balance < amount) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      // Step 2: Kurangi saldo user
      userDB.query(
        "UPDATE users SET balance = balance - ? WHERE id = ?",
        [amount, user_id],
        (err) => {
          if (err)
            return res.status(500).json({ error: "Failed to deduct balance" });

          // Step 3: Simpan donasi
          Donation.createDonation(
            user_id,
            amount,
            description,
            (err, result) => {
              if (err)
                return res
                  .status(500)
                  .json({ error: "Failed to create donation" });

              res.json({
                message: "Donation successful",
                donation_id: result.insertId,
              });
            }
          );
        }
      );
    }
  );
};

// GET /api/donations
exports.getAllDonations = (req, res) => {
  Donation.getAllDonations((err, results) => {
    if (err)
      return res.status(500).json({ error: "Failed to fetch donations" });
    res.json(results);
  });
};

// GET /api/donations/:id
exports.getDonationById = (req, res) => {
  const { id } = req.params;
  Donation.getDonationById(id, (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: "Donation not found" });
    }
    res.json(results[0]);
  });
};

// PUT /api/donations/:id
exports.updateDonation = (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  Donation.updateDonation(id, description, (err) => {
    if (err) return res.status(500).json({ error: "Update failed" });
    res.json({ message: "Donation updated" });
  });
};

// DELETE /api/donations/:id
exports.deleteDonation = (req, res) => {
  const { id } = req.params;
  Donation.deleteDonation(id, (err) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    res.json({ message: "Donation deleted" });
  });
};
