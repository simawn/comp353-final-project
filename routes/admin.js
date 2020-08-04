const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

router.put("/admin/:userName/:newStatus", adminController.updateUserActiveStatus);
router.get("/admin/joboverview", adminController.getAllJobs);
router.get("/admin/useroverview", adminController.getAllUsers);

module.exports = router;
