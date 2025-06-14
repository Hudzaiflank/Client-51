const generateVaNumber = (userId) => {
  const prefix = "VA";
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${userId}${random}`;
};

module.exports = generateVaNumber;
