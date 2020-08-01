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
    res.status(200).send(categories);
  } catch (err) {
    res.status(404).send({
      error: "Could not retrieve categories.",
    });
  }
};
