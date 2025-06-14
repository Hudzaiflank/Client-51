const express = require("express");
const app = express();
require("dotenv").config();

const donationRoutes = require("./routes/donationRoutes");

app.use(express.json());
app.use("/api/donations", donationRoutes);

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`DonationService running on http://localhost:${PORT}`);
});
