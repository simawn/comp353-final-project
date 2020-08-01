const db = require("../database");

exports.getJobStatuses = async (req, res, next) => {
  // Return bad request if data is missing
  if (!req.params.userName) {
    return res.status(400).send({
      error: "No username provided.",
    });
  }

  const userName = req.params.userName;

  try {
    // Fetch user's job status from database
    const jobStatuses = await db.query(
      `SELECT Applicant.jobID, Applicant.status FROM Applicant WHERE Applicant.userName = '${userName}'`,
      { type: db.QueryTypes.SELECT }
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

exports.postJobApplication = async (req, res, next) => {
  // Return bad request if data is missing
  if (!req.params.userName || !req.params.jobID) {
    return res.status(400).send({
      error: "Either username or jobID not provided.",
    });
  }

  const userName = req.params.userName;
  const jobID = req.params.jobID;

  try {
    await db.query(
      `INSERT INTO \`Applicant\`(userName, jobID, \`status\`) VALUES ('${userName}', ${jobID}, 'pending')`
    );

    res.status(201).send({
      message: "Applicant successfully applied to the listing.",
    });
  } catch {
    res.status(400).send({
      error: "Applicant was not able to apply to the listing.",
    });
  }
};

exports.updateJobStatus = async (req, res, next) => {
  // Return bad request if data is missing
  if (!req.params.userName || !req.params.jobID || !req.params.newStatus) {
    return res.status(400).send({
      error: "Either userName, jobID or newStatus not provided.",
    });
  }

  const userName = req.params.userName;
  const jobID = req.params.jobID;
  const newStatus = req.params.newStatus;

  try {
    await db.query(`UPDATE Applicant SET status = '${newStatus}' WHERE userName = '${userName}' AND jobID = ${jobID}`);

    res.status(200).send({
      message: "Applicant status successfully updated.",
    });
  } catch {
    res.status(404).send({
      error: "Could not update Squad",
    });
  }
};
