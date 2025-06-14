const express = require("express");
const router = express.Router();
const controller = require("../controllers/transactionController");

router.get("/transactions", controller.getAllTransactions);
router.get("/transactions/:id", controller.getTransactionById);
router.post("/transactions", controller.createTransaction);
router.put("/transactions/:id", controller.updateTransaction);
router.delete("/transactions/:id", controller.deleteTransaction);

module.exports = router;
