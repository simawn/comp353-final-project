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

    return res.status(200).send(jobStatuses);
  } catch {
    return res.status(404).send({
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

  // Find the amount of jobs the user should be able to apply for
  const applicationLimit = (
    await db.query(
      `SELECT Subscription.limit FROM User JOIN Subscription ON Subscription.subscriptionID = User.subscriptionID WHERE Username = '${userName}';`,
      { type: db.QueryTypes.SELECT }
    )
  )[0];

  // Count the number of jobs the user has already applied for
  const applicationCount = (
    await db.query(`SELECT COUNT(*) FROM Applicant WHERE Username = '${userName}';`, {
      type: db.QueryTypes.SELECT,
    })
  )[0];

  // Check to see if they have reached their limit
  if (applicationCount["COUNT(*)"] >= applicationLimit["limit"]) {
    return res.status(400).send({
      error: "You have reached the application limit. Please upgrade your subscription.",
    });
  }

  const jobID = req.params.jobID;

  try {
    await db.query(
      `INSERT INTO \`Applicant\`(userName, jobID, \`status\`, \`appliedDate\`) VALUES ('${userName}', ${jobID}, 'pending', CURDATE())`,
      { type: db.QueryTypes.INSERT }
    );

    return res.status(201).send({
      message: "Applicant successfully applied to the listing.",
    });
  } catch {
    return res.status(400).send({
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
    await db.query(`UPDATE Applicant SET status = '${newStatus}' WHERE userName = '${userName}' AND jobID = ${jobID}`, {
      type: db.QueryTypes.UPDATE,
    });

    res.status(200).send({
      message: "Applicant status successfully updated.",
    });
  } catch {
    res.status(404).send({
      error: "Could not update Job status",
    });
  }
};

exports.getApplicants = async (req, res, next) => {
  // Return bad request if data is missing
  if (!req.params.jobID) {
    return res.status(400).send({
      error: "jobID not provided.",
    });
  }

  const jobID = req.params.jobID;

  try {
    const applicantList = await db.query(
      `SELECT User.userName, User.firstName, User.lastName, Applicant.status, Applicant.appliedDate, Applicant.jobID FROM Applicant JOIN User ON Applicant.userName = User.userName WHERE Applicant.jobID = ${jobID};`,
      { type: db.QueryTypes.SELECT }
    );

    return res.status(200).send(applicantList);
  } catch {
    return res.status(400).send({
      error: "Could not update retrieve applicant list",
    });
  }
};
