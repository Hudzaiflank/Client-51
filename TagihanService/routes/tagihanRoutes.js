const express = require("express");
const router = express.Router();
const controller = require("../controllers/tagihanController");

router.get("/tagihans", controller.getTagihans);
router.get("/tagihans/:id", controller.getTagihan);
router.post("/tagihans", controller.createManual);
router.post("/tagihans/recurring", controller.createRecurring);
router.put("/tagihans/:id", controller.updateTagihan);
router.delete("/tagihans/:id", controller.deleteTagihan);

module.exports = router;
