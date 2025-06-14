const express = require("express");
require("dotenv").config();
const app = express();
require("./db");
const routes = require("./routes/paymentRoutes");

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`PaymentService running at http://localhost:${PORT}`);
});
