const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes/donationRoutes");

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`DonationService running on http://localhost:${PORT}`);
});
