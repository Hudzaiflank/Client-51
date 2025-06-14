const express = require("express");
require("dotenv").config();
const app = express();
require("./db");
const routes = require("./routes/tagihanRoutes");

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`TagihanService running at http://localhost:${PORT}`);
});
