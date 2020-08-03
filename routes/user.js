const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.get("/users/:userName", userController.getUserDetails);

router.put("/users/:userName", userController.editUserDetails);

router.put("/users/:userID/subscription/:subscriptionID", userController.editUserSubscription);

router.delete("/user", userController.deleteUser);

module.exports = router;
