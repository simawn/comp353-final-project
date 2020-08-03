const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.get("/payments/:userName", paymentController.getPaymentMethods);

router.post("/payments/:userName", paymentController.postPaymentMethod);

router.put("/payments/:userName", paymentController.editPaymentMethod);

router.delete("/payments/:userName", paymentController.deletePaymentMethod);

module.exports = router;
