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
    return res.status(200).send(jobs);
  } catch (err) {
    return res.status(404).send({
      error: "Could not retrieve jobs.",
    });
  }
};

exports.getAllEmployerJobs = async (req, res, next) => {
  if (!req.params.userName) {
    return res.status(400).send({
      error: "No username provided.",
    });
  }

  userName = req.params.userName;

  try {
    // Fetch jobs from database
    const jobs = await db.query(`SELECT * FROM Job WHERE Job.userName = '${userName}'`, { type: db.QueryTypes.SELECT });

    // Return list of jobs
    return res.status(200).send(jobs);
  } catch (err) {
    return res.status(404).send({
      error: `Could not retrieve jobs posted by ${userName}.`,
    });
  }
};

exports.getJobCategories = async (req, res, next) => {
  try {
    const categories = await db.query("SELECT * FROM Category", { type: db.QueryTypes.SELECT });

    // Return no content if no categories exist in list
    if (categories.length < 1) {
      return res.status(204).send({
        message: "No categories currently exist.",
      });
    }

    // Add Select All option
    categories.unshift({ categoryName: "Select All" });

    // Return list of categories
    return res.status(200).send(categories);
  } catch (err) {
    return res.status(404).send({
      error: "Could not retrieve categories.",
    });
  }
};

exports.postJob = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.category || !req.body.jobDescription || !req.body.employeesNeeded) {
      return res.status(400).send({
        error: "Not all information needed to create job was provided.",
      });
    }

    const userName = req.params.userName;

    // Find the amount of jobs the user should be about post
    const jobLimit = (
      await db.query(
        `SELECT Subscription.limit FROM User JOIN Subscription ON Subscription.subscriptionID = User.subscriptionID WHERE Username = '${userName}';`,
        { type: db.QueryTypes.SELECT }
      )
    )[0];

    // Cound the number of jobs the user has posted
    const jobCount = (
      await db.query(`SELECT COUNT(*) FROM Job WHERE Username = '${userName}';`, {
        type: db.QueryTypes.SELECT,
      })
    )[0];

    // Check to see if they have reached their limit
    if (jobCount["COUNT(*)"] >= jobLimit["limit"]) {
      return res.status(400).send({
        error: "You have reached the job limit. Please either delete a listing or upgrade your subscription.",
      });
    }

    const title = req.body.title;
    const categoryName = req.body.category;
    const description = req.body.jobDescription;
    const employeesNeeded = req.body.employeesNeeded;

    await db.query(
      `INSERT INTO \`Job\`(userName, categoryName, title, datePosted, \`description\`, employeesNeeded) VALUES ('${userName}', '${categoryName}', '${title}', CURDATE(), '${description}', ${employeesNeeded});`,
      { type: db.QueryTypes.INSERT }
    );
    return res.status(200).send({ message: "Successfully added new job." });
  } catch (err) {
    return res.status(400).send({
      error: "Error creating Job.",
    });
  }
};

exports.postJobCategory = async (req, res, next) => {
  try {
    if (!req.body.categoryName) {
      return res.status(400).send({
        error: "Category name was not provided",
      });
    }

    const categoryName = req.body.categoryName;

    await db.query(`INSERT INTO \`Category\`(categoryName) VALUES ('${categoryName}');`, {
      type: db.QueryTypes.INSERT,
    });

    return res.status(200).send({ message: "Sucessfully added new category." });
  } catch (err) {
    return res.status(400).send({
      error: "Error creating category.",
    });
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    if (!req.params.jobID) {
      return res.status(404).send({
        error: "JobID name was not found.",
      });
    }

    const jobID = req.params.jobID;

    // Delete from applicant table
    await db.query(`DELETE FROM \`Applicant\` WHERE jobID = ${jobID};`, {
      type: db.QueryTypes.DELETE,
    });

    // Delete from user job table
    await db.query(`DELETE FROM \`Job\` WHERE jobID = ${jobID};`, {
      type: db.QueryTypes.DELETE,
    });

    return res.status(200).send({ message: "Sucessfully deleted job." });
  } catch (err) {
    return res.status(400).send({
      error: "Error deleting job.",
    });
  }
};

exports.editJob = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.category || !req.body.jobDescription || !req.body.employeesNeeded) {
      return res.status(400).send({
        error: "Not all information needed to edit the job was provided.",
      });
    }

    const title = req.body.title;
    const categoryName = req.body.category;
    const description = req.body.jobDescription;
    const employeesNeeded = req.body.employeesNeeded;
    const jobID = req.params.jobID;

    // Update the selected job
    await db.query(
      `UPDATE Job SET categoryName = '${categoryName}', title = '${title}', \`description\` = '${description}', employeesNeeded = ${employeesNeeded} WHERE jobID = ${jobID};`,
      {
        type: db.QueryTypes.UPDATE,
      }
    );

    return res.status(200).send({ message: "Sucessfully updated job." });
  } catch (err) {
    return res.status(400).send({
      error: "Error updating job.",
    });
  }
};
