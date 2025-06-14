const { donationDB } = require("../db");

const createDonation = (user_id, amount, description, callback) => {
  const query =
    "INSERT INTO donations (user_id, amount, description) VALUES (?, ?, ?)";
  donationDB.query(query, [user_id, amount, description], callback);
};

const getAllDonations = (callback) => {
  donationDB.query("SELECT * FROM donations", callback);
};

const getDonationById = (id, callback) => {
  donationDB.query(
    "SELECT * FROM donations WHERE donation_id = ?",
    [id],
    callback
  );
};

const updateDonation = (id, description, callback) => {
  donationDB.query(
    "UPDATE donations SET description = ? WHERE donation_id = ?",
    [description, id],
    callback
  );
};

const deleteDonation = (id, callback) => {
  donationDB.query(
    "DELETE FROM donations WHERE donation_id = ?",
    [id],
    callback
  );
};

module.exports = {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
};
