const express = require("express");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
require("./db"); // koneksi DB

app.use(express.json());
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`UserService is running at http://localhost:${PORT}`);
});
