const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes/transferValasRoutes");

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`TransferValasService running on http://localhost:${PORT}`);
});
