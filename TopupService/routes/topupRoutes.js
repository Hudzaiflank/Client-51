const express = require("express");
const router = express.Router();
const controller = require("../controllers/topupController");

router.get("/topups", controller.getTopups);
router.get("/topups/:id", controller.getTopup);
router.post("/topups", controller.addTopup);
router.put("/topups/:id", controller.updateTopup);
router.delete("/topups/:id", controller.deleteTopup);

module.exports = router;
