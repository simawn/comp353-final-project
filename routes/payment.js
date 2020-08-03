const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.get("/payments/:userName", paymentController.getPaymentMethods);

router.post("/payments/:userName", paymentController.postPaymentMethod);

router.put("/payments/:paymentID", paymentController.editPaymentMethod);

router.delete("/payments/:paymentID", paymentController.deletePaymentMethod);

module.exports = router;
