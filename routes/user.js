const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.get("/user", userController.getUserDetails);

router.put('/user', userController.editUserDetails);

router.delete('/user', userController.deleteUser);

module.exports = router;
