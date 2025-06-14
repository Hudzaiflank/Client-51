const express = require("express");
const router = express.Router();
const controller = require("../controllers/paymentController");

router.get("/payments", controller.getAllPayments);
router.get("/payments/:id", controller.getPaymentById);
router.post("/payments", controller.createPayment);
router.put("/payments/:id", controller.updatePayment);
router.delete("/payments/:id", controller.deletePayment);

module.exports = router;
