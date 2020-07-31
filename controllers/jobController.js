const db = require("../database");

exports.getAllJobs = async (req, res, next) => {
  try {
    // Fetch jobs from database
    const jobs = await db.query("SELECT * FROM Job", { type: db.QueryTypes.SELECT });

    // Return no content if no jobs exist in list
    if (jobs.length < 1) {
      return res.status(204).send({
        message: "No jobs currently exist.",
      });
    }

    // Return list of jobs
    res.status(200).send(jobs);
  } catch (err) {
    res.status(404).send({
      error: "Could not retrieve jobs.",
    });
  }
};

exports.getEmployeeJobStatuses = async (req, res, next) => {
  // Return bad request if data is missing
  if (!req.body.userName) {
    return res.status(400).send({
      error: "No username provided.",
    });
  }

  const userName = req.body.userName;

  try {
    // Fetch user's job status from database
    const jobStatuses = await db.query(
      `SELECT Job.jobID, Applicant.status FROM Job JOIN Applicant ON Applicant.jobID = Job.jobID WHERE Applicant.employeeID = ${userName}`
    );

    // If user has applied to no jobs then return empty array
    if (jobStatuses.length < 1) {
      return status(204).send([]);
    }

    res.status(200).send(jobStatuses);
  } catch (err) {
    res.status(404).send({
      error: `Could not retrieve job statuses for user: ${userName}`,
    });
  }
};
