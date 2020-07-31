const express = require("express");

const jobController = require("../controllers/jobController");

const router = express.Router();

// Job Specific Routes
router.get("/jobs", jobController.getAllJobs);

// Job - Applicant Interaction Specific Routes
router.get("/jobs/:userID", jobController.getEmployeeJobStatuses);

module.exports = router;
