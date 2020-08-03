const bcrypt = require("bcryptjs");
const db = require("../database");

exports.getUserDetails = async (req, res) => {
  if (!req.params.userName) {
    return res.status(400).send({
      error: "No username provided.",
    });
  }

  const userName = req.params.userName;

  try {
    // Fetch user from database
    const user = await db.query(
      `SELECT User.userName, User.role, User.firstName, User.subscriptionID, User.lastName, User.email, User.balance, User.lastPayment, User.paysWithManual, Subscription.name FROM User JOIN Subscription ON Subscription.subscriptionID = User.subscriptionID WHERE userName = '${userName}'`,
      { type: db.QueryTypes.SELECT }
    );

    return res.status(200).send(user[0]);
  } catch {
    return res.status(404).send({
      error: `Could not retrieve information for user: ${userName}`,
    });
  }
};

/**
 * Updates a user personal info. Must be logged in to send request
 *
 * @param user From credentials (Required)
 * @param firstName Body (Optional)
 * @param lastName Body (Optional)
 * @param email Body (Optional)
 * @param password Body (Optional)
 *
 */
exports.editUserDetails = async (req, res) => {
  // Edit User Balance
  if (req.body.payment) {
    try {
      const userName = req.params.userName;
      let payment = req.body.payment;

      let balance = await db.query(`SELECT User.balance FROM User WHERE userName = '${userName}'`, {
        type: db.QueryTypes.SELECT,
      });

      balance = parseFloat(balance[0].balance).toFixed(2);
      payment = parseFloat(payment).toFixed(2);

      const newBalance = Number(balance) + Number(payment);

      await db.query(`UPDATE User SET balance = ${newBalance} WHERE userName = '${userName}'`, {
        type: db.QueryTypes.UPDATE,
      });

      return res.status(200).send({
        message: "Successfully updated upayment.",
      });
    } catch {
      return res.status(400).send({
        error: "Unable to fulfill payment.",
      });
    }
  }

  // Edit All User Values
  try {
    if (!req.body.firstName || !req.body.lastName || !req.body.password || !req.body.email || !req.body.paymentMethod) {
      return res.status(400).send({
        error: "Not all information needed to edit the user was provided.",
      });
    }

    let password = req.body.password;
    const paysWithManual = req.body.paymentMethod === "manual" ? 1 : 0;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const userName = req.params.userName;

    password = await bcrypt.hash(password, 10);

    // Update the selected job
    await db.query(
      `UPDATE User SET firstName = '${firstName}', lastName = '${lastName}', paysWithManual = '${paysWithManual}', \`password\` = '${password}', email = '${email}' WHERE userName = '${userName}';`,
      {
        type: db.QueryTypes.UPDATE,
      }
    );

    return res.status(200).send({ message: "Sucessfully updated user." });
  } catch (err) {
    return res.status(400).send({
      error: "Error updating user.",
    });
  }
};

/**
 * Deactivates user account. Currently sets the active status to 0.
 */
exports.deleteUser = async (req, res) => {
  try {
    const { userName } = req.params;
    if (!userName) throw new Error("No username set");

    // TODO: Fix?
    // const userInfo = req.user[0];
    // if (!userInfo.userName) throw new Error('No username set');

    // Assuming we have ON DELETE CASCADE for all creditCardNumber and userName FK
    await db.query(
      `
    DELETE FROM CreditCard WHERE creditCardNumber IN 
      (SELECT P.creditCardNumber
      FROM (SELECT * FROM CreditCard) as DC , PaymentMethod AS P
      WHERE DC.creditCardnumber = P.creditCardNumber AND P.userName = ?);

    DELETE FROM User WHERE username=?;
    `,
      { replacements: [userName, userName] }
    );

    res.status(200).send({
      message: "Account deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error: "Cannot delete user",
    });
  }
};

exports.editUserSubscription = async (req, res, next) => {
  try {
    if (!req.params.subscriptionID || !req.params.userName) {
      return res.status(400).send({
        error: "SubscriptionID was not provided.",
      });
    }

    const subscriptionID = req.params.subscriptionID;
    const userName = req.params.userName;

    // Update the selected job
    await db.query(`UPDATE User SET subscriptionID = ${subscriptionID} WHERE userName = '${userName}';`, {
      type: db.QueryTypes.UPDATE,
    });

    return res.status(200).send({ message: "Sucessfully updated user." });
  } catch (err) {
    return res.status(400).send({
      error: "Error updating user.",
    });
  }
};
