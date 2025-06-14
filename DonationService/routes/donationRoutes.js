const express = require("express");
const router = express.Router();
const controller = require("../controllers/donationController");

router.get("/donations", controller.getAllDonations);
router.get("/donations/:id", controller.getDonationById);
router.post("/donations", controller.createDonation);
router.put("/donations/:id", controller.updateDonation);
router.delete("/donations/:id", controller.deleteDonation);

module.exports = router;
