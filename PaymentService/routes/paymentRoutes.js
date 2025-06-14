const express = require("express");
const router = express.Router();
const controller = require("../controllers/paymentController");

router.get("/payments", controller.getPayments);
router.get("/payments/:id", controller.getPayment);
router.post("/payments", controller.addPayment);
router.put("/payments/:id", controller.updatePayment);
router.delete("/payments/:id", controller.deletePayment);

module.exports = router;
