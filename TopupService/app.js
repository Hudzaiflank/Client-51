const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes/topupRoutes");

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`TopupService running on http://localhost:${PORT}`);
});
