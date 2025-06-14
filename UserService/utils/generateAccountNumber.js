const generateAccountNumber = () => {
  const prefix = "88";
  const random = Math.floor(100000000 + Math.random() * 900000000);
  return prefix + random.toString().slice(0, 8); // total 10 digit
};

module.exports = generateAccountNumber;
