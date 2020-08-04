const db = require("../database");

/**
 * Updates the active status on a user
 * @param userName (Query Param)
 * @param status (Query Param)
 */
exports.updateUserActiveStatus = async (req, res) => {
  try {
    const newStatus = req.params.newStatus;
    const userName = req.params.userName;

    await db.query("UPDATE User SET active=? WHERE userName=?", { replacements: [newStatus, userName] });

    return res.status(200).send({
      message: "Updated user status successfully",
    });
  } catch {
    return res.status(400).send({
      error: "Could not update user status",
    });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await db.query("SELECT * FROM Job", { type: db.QueryTypes.SELECT });

    return res.status(200).send(jobs);
  } catch {
    return res.status(400).send({
      error: "Failed to retrieve ALL jobs.",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.query(
      "SELECT * FROM User JOIN Subscription ON Subscription.subscriptionID = User.subscriptionID",
      { type: db.QueryTypes.SELECT }
    );

    return res.status(200).send(users);
  } catch {
    return res.status(400).send({
      error: "Failed to retrieve ALL users.",
    });
  }
};
