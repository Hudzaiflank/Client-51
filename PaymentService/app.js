const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes/paymentRoutes");

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`PaymentService running on http://localhost:${PORT}`);
});
