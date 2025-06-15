const { spawn } = require("child_process");
const path = require("path");

const basePath = path.join(__dirname, "..");

const services = [
  { name: "UserService", port: 4001 },
  { name: "TopupService", port: 4002 },
  { name: "TransactionService", port: 4003 },
  { name: "TransferValasService", port: 4004 },
  { name: "TagihanService", port: 4005 },
  { name: "PaymentService", port: 4006 },
  { name: "DonationService", port: 4007 },
];

services.forEach(({ name, port }) => {
  const serviceDir = path.join(basePath, name);
  const service = spawn("node", ["app.js"], {
    cwd: serviceDir,
    stdio: "inherit",
    shell: true,
  });

  service.on("error", (err) => {
    console.error(`❌ Gagal menjalankan ${name}:`, err);
  });

  console.log(` ${name} berjalan di port ${port}`);
});
