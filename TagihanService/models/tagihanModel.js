const { tagihanDB, userDB } = require("../db");
const generateVa = require("../utils/generateVa");

// Ambil semua user dari DB user
const getAllUsers = (cb) => {
  userDB.query("SELECT id FROM users", cb);
};

// Generate tagihan default "Pajak"
const createRecurringTagihan = (userId, cb) => {
  const va = generateVa(userId);
  const query = `
    INSERT INTO tagihans (user_id, va_number, amount, description, status)
    VALUES (?, ?, 50000, 'Pajak Bulanan', 'pending')
  `;
  tagihanDB.query(query, [userId, va], cb);
};

const getAllTagihan = (cb) => {
  tagihanDB.query("SELECT * FROM tagihans", cb);
};

const getTagihanById = (id, cb) => {
  tagihanDB.query("SELECT * FROM tagihans WHERE id = ?", [id], cb);
};

const createTagihanManual = (data, cb) => {
  const va = generateVa(data.user_id);
  const query = `
    INSERT INTO tagihans (user_id, va_number, amount, description, status)
    VALUES (?, ?, ?, ?, 'pending')
  `;
  tagihanDB.query(query, [data.user_id, va, data.amount, data.description], cb);
};

const createRecurringTagihanCustom = (userId, amount, description, cb) => {
  const va = generateVa(userId);
  const query = `
    INSERT INTO tagihans (user_id, va_number, amount, description, status)
    VALUES (?, ?, ?, ?, 'pending')
  `;
  tagihanDB.query(query, [userId, va, amount, description], cb);
};

const updateTagihan = (id, data, cb) => {
  tagihanDB.query(
    "UPDATE tagihans SET description = ?, amount = ? WHERE id = ?",
    [data.description, data.amount, id],
    cb
  );
};

const deleteTagihan = (id, cb) => {
  tagihanDB.query("DELETE FROM tagihans WHERE id = ?", [id], cb);
};

module.exports = {
  getAllUsers,
  createRecurringTagihan,
  getAllTagihan,
  getTagihanById,
  createTagihanManual,
  updateTagihan,
  deleteTagihan,
  createRecurringTagihanCustom,
};
