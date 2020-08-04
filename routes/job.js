const express = require("express");

const jobController = require("../controllers/jobController");

const router = express.Router();

// Job Specific Routes
router.get("/jobs", jobController.getAllJobs);
router.get("/jobs/:startDate/:endDate", jobController.getDatedJobs);
router.post("/jobs/categories", jobController.postJobCategory);
router.post("/jobs/:userName", jobController.postJob);
router.get("/jobs/categories", jobController.getJobCategories);
router.get("/jobs/:userName", jobController.getAllEmployerJobs);
router.delete("/jobs/:jobID", jobController.deleteJob);
router.put("/jobs/:jobID", jobController.editJob);

module.exports = router;
