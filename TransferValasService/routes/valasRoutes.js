const express = require("express");
const router = express.Router();
const controller = require("../controllers/valasController");

router.get("/valas", controller.getTransfers);
router.get("/valas/:id", controller.getTransfer);
router.post("/valas", controller.addTransfer);
router.put("/valas/:id", controller.updateTransfer);
router.delete("/valas/:id", controller.deleteTransfer);

module.exports = router;
