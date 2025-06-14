const express = require("express");
require("dotenv").config();
const app = express();
const topupRoutes = require("./routes/topupRoutes");
require("./db"); // connect to DB

app.use(express.json());
app.use("/api", topupRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`TopupService running at http://localhost:${PORT}`);
});
