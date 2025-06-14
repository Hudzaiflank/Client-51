const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes/transactionRoutes");

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`TransactionService running on http://localhost:${PORT}`);
});
