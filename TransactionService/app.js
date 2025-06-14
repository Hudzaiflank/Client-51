const express = require("express");
require("dotenv").config();
const app = express();
require("./db");
const routes = require("./routes/transactionRoutes");

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`TransactionService running at http://localhost:${PORT}`);
});
