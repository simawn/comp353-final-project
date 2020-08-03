const db = require("../database");

exports.getPaymentMethods = async (req, res, next) => {
  if (!req.params.userName) {
    return res.status(400).send({
      error: "No username provided.",
    });
  }

  const userName = req.params.userName;

  try {
    // Fetch user's payment methods from database
    const paymentMethods = await db.query(
      `SELECT PaymentMethod.paymentID, PaymentMethod.creditCardNumber, PaymentMethod.accountNumber, PaymentMethod.active, PaymentMethod.active, CreditCard.expirationDate, CreditCard.cvv FROM PaymentMethod LEFT JOIN CreditCard ON CreditCard.creditCardNumber = PaymentMethod.creditCardNumber WHERE PaymentMethod.userName = '${userName}'`,
      {
        type: db.QueryTypes.SELECT,
      }
    );

    // If user has applied to no jobs then return empty array
    if (paymentMethods.length < 1) {
      return status(204).send([]);
    }

    return res.status(200).send(paymentMethods);
  } catch {
    return res.status(404).send({
      error: `Could not retrieve payment methods for user: ${userName}`,
    });
  }
};

exports.postPaymentMethod = async (req, res, next) => {
  const userName = req.params.userName;

  // Add checking account
  if (req.body.accountNumber) {
    accountNumber = req.body.accountNumber;

    try {
      // Add checking account into the database
      await db.query(
        `INSERT INTO \`PaymentMethod\`(userName, creditCardNumber, accountNumber, active) VALUES ('${userName}', NULL, ${accountNumber}, 0)`,
        {
          type: db.QueryTypes.INSERT,
        }
      );

      return res.status(200).send({
        message: `Successfully added a checking account for user: ${userName}`,
      });
    } catch {
      return res.status(404).send({
        error: `Could not add a credit card for user: ${userName}`,
      });
    }
  }

  if (req.body.creditCardNumber) {
    creditCardNumber = req.body.creditCardNumber;
    cvv = req.body.cvv;
    expirationDate = req.body.expirationDate;

    try {
      // Add credit card
      await db.query(
        `INSERT INTO \`CreditCard\`(creditCardNumber, expirationDate, cvv) VALUES ('${creditCardNumber}', '${expirationDate}', '${cvv}')`,
        {
          type: db.QueryTypes.INSERT,
        }
      );

      // Add checking account into the database
      await db.query(
        `INSERT INTO \`PaymentMethod\`(userName, creditCardNumber, accountNumber, active) VALUES ('${userName}', '${creditCardNumber}', NULL, 0)`,
        {
          type: db.QueryTypes.INSERT,
        }
      );

      return res.status(200).send({
        message: `Successfully added a credit card for user: ${userName}`,
      });
    } catch {
      return res.status(404).send({
        error: `Could not add a credit card for user: ${userName}`,
      });
    }
  }

  return res.status(400).send({
    error: "Not all information was correctly provided.",
  });
};

exports.editPaymentMethod = async (req, res, next) => {
  // Change active payment method
  if (req.body.active) {
    try {
      const userName = req.body.userName;
      const paymentID = req.params.paymentID;

      // Turn off active payment
      await db.query(`UPDATE PaymentMethod SET active = 0 WHERE username = '${userName}' AND active = 1`, {
        type: db.QueryTypes.UPDATE,
      });

      // Set new active payment
      await db.query(`UPDATE PaymentMethod SET active = 1 WHERE paymentID = ${paymentID}`, {
        type: db.QueryTypes.UPDATE,
      });

      return res.status(200).send({ message: "Sucessfully changed active payment method." });
    } catch (err) {
      return res.status(400).send({
        error: "Error changing payment method.",
      });
    }
  }

  // Edit Credit card
  if (req.body.creditCardNumber) {
    try {
      const creditCardNumber = req.body.creditCardNumber;
      const cvv = req.body.cvv;
      const expirationDate = req.body.expirationDate;

      // NOTE: This is actually the current credit card number
      const currentCreditCardNumber = req.params.paymentID;

      // Edit the checking account
      await db.query(
        `UPDATE CreditCard SET creditCardNumber = '${creditCardNumber}', cvv = '${cvv}', expirationDate = '${expirationDate}'  WHERE creditCardNumber = '${currentCreditCardNumber}'`,
        {
          type: db.QueryTypes.UPDATE,
        }
      );

      return res.status(200).send({ message: "Sucessfully edited credit card." });
    } catch (err) {
      return res.status(400).send({
        error: "Error editing credit card.",
      });
    }
  }

  // Edit Checking account
  if (req.body.accountNumber) {
    try {
      const accountNumber = req.body.accountNumber;
      const paymentID = req.params.paymentID;

      // Edit the checking account
      await db.query(`UPDATE PaymentMethod SET accountNumber = '${accountNumber}' WHERE paymentID = ${paymentID}`, {
        type: db.QueryTypes.UPDATE,
      });

      return res.status(200).send({ message: "Sucessfully edited checking account." });
    } catch (err) {
      return res.status(400).send({
        error: "Error editing checking account.",
      });
    }
  }
};

exports.deletePaymentMethod = async (req, res, next) => {
  if (!req.params.paymentID) {
    return res.status(400).send({
      error: "No paymentID provided.",
    });
  }

  const paymentID = req.params.paymentID;

  try {
    await db.query(`DELETE FROM \`PaymentMethod\` WHERE PaymentMethod.paymentID = ${paymentID}`, {
      type: db.QueryTypes.DELETE,
    });

    return res.status(200).send({
      message: "Successfully deleted payment.",
    });
  } catch {
    return res.status(404).send({
      error: `Could not delete payment.`,
    });
  }
};
