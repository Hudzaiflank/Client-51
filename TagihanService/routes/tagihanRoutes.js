const express = require("express");
const router = express.Router();
const controller = require("../controllers/tagihanController");

router.get("/tagihans", controller.getAllTagihans);
router.get("/tagihans/:id", controller.getTagihanById);
router.post("/tagihans", controller.createTagihan);
router.put("/tagihans/:id", controller.updateTagihan);
router.delete("/tagihans/:id", controller.deleteTagihan);

module.exports = router;
