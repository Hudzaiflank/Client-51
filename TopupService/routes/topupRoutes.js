const express = require("express");
const router = express.Router();
const controller = require("../controllers/topupController");

router.get("/topups", controller.getAllTopups);
router.get("/topups/:id", controller.getTopupById);
router.post("/topups", controller.createTopup);
router.put("/topups/:id", controller.updateTopup);
router.delete("/topups/:id", controller.deleteTopup);

module.exports = router;
