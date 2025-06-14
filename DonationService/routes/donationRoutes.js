const express = require("express");
const router = express.Router();
const controller = require("../controllers/donationController");

router.post("/", controller.createDonation);
router.get("/", controller.getAllDonations);
router.get("/:id", controller.getDonationById);
router.put("/:id", controller.updateDonation);
router.delete("/:id", controller.deleteDonation);

module.exports = router;
