const express = require("express");

const applicantController = require("../controllers/applicantController");

const router = express.Router();

// Applicant Specific Routes
router.get("/applicants/:userName/statuses", applicantController.getJobStatuses);
router.get("/applicants/:jobID", applicantController.getApplicants);
router.post("/applicants/:userName/listing/:jobID", applicantController.postJobApplication);
router.put("/applicants/:userName/listing/:jobID/status/:newStatus", applicantController.updateJobStatus);

module.exports = router;
