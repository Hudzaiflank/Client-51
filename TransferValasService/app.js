const express = require("express");
require("dotenv").config();
const app = express();
require("./db");
const routes = require("./routes/valasRoutes");

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`TransferValasService running at http://localhost:${PORT}`);
});
