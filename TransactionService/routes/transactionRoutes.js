const express = require("express");
const router = express.Router();
const controller = require("../controllers/transactionController");

router.get("/transactions", controller.getTransactions);
router.get("/transactions/:id", controller.getTransaction);
router.post("/transactions", controller.addTransaction);
router.put("/transactions/:id", controller.updateTransaction);
router.delete("/transactions/:id", controller.deleteTransaction);

module.exports = router;
