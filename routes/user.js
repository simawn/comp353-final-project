const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.get("/users/:userName", userController.getUserDetails);

router.put("/users/:userName", userController.editUserDetails);

router.put("/users/:userName/subscription/:subscriptionID", userController.editUserSubscription);

router.delete("/users/:userName", userController.deleteUser);

module.exports = router;
