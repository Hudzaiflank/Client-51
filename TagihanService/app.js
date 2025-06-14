const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes/tagihanRoutes");

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`TagihanService running on http://localhost:${PORT}`);
});
