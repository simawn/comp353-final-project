const express = require("express");

const jobController = require("../controllers/jobController");

const router = express.Router();

// Job Specific Routes
router.get("/jobs", jobController.getAllJobs);
router.get("/jobs/categories", jobController.getJobCategories);

module.exports = router;
