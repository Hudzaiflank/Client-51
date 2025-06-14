const { spawn } = require("child_process");
const path = require("path");

const basePath = path.join(__dirname, "..");

const services = [
  { name: "UserService", port: 3001 },
  { name: "TopupService", port: 3002 },
  { name: "TransactionService", port: 3003 },
  { name: "TransferValasService", port: 3004 },
  { name: "TagihanService", port: 3005 },
  { name: "PaymentService", port: 3006 },
  { name: "DonationService", port: 3007 },
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
