const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("../database");

exports.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // eslint-disable-line
    try {
      if (err) throw err;
      if (!user) {
        res.status(400).send({ message: "Unable to login!", severity: "error" });
      } else {
        req.logIn(user, (err) => {
          //eslint-disable-line
          if (err) throw err;
          res.status(200).send(user);
        });
      }
    } catch (error) {
      res.status(400).send({ message: "Unable to login!", severity: "error" });
    }
  })(req, res, next);
};

exports.register = async (req, res, next) => {
  const { userName, password, email, firstName, lastName } = req.body;

  let role = req.body.role;
  let subscription = req.body.subscription;

  // Set employee subscription manually
  if (role === "employee") {
    subscription = 3;
  } else {
    subscription = 1;
  }

  try {
    const result = (
      await db.query("SELECT * FROM User WHERE userName=?", { replacements: [userName], type: db.QueryTypes.SELECT })
    )[0];
    if (result) throw new Error("Username already exists!");

    const passwordEncrypt = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO User (userName, subscriptionID, password, email, firstName, lastName, role, balance, paysWithManual, active) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 1, 1)",
      {
        replacements: [userName, subscription, passwordEncrypt, email, firstName, lastName, role],
        type: db.QueryTypes.INSERT,
      }
    );

    res.status(200).send({
      message: "Account created. You may now log in.",
      alertSeverity: "success",
    });
  } catch (error) {
    res.status(400).send({
      message: "There has been an error in you registration. Please try again.",
      alertSeverity: "error",
    });
  }
};

exports.logout = async (req, res, next) => {
  req.logout();
  res.sendStatus(200);
};

exports.resetPassword = async (req, res, next) => {
  const {
    newPassword, firstName, lastName, userName,
  } = req.body;

  if (!newPassword || !firstName || !lastName || !userName) {
    return res.status(400).send({
      message: "We cannot reset your password. Please try again.",
      alertSeverity: "error",
    });
  }

  try {
    const userData = await db.query("SELECT firstName, lastName FROM User WHERE userName=?", { replacements: [userName], type: db.QueryTypes.SELECT });

    if (firstName === userData[0].firstName && lastName === userData[0].lastName) {
      const encryptNewPassword = await bcrypt.hash(newPassword, 10);
      await db.query("Update User SET password=? WHERE userName=?", { replacements: [encryptNewPassword, userName] });

      res.status(200).send({
        message: "Your password has been reset.",
        alertSeverity: "success",
      });
    } else {
      return res.status(400).send({
        message: "The information provided is invalid. Please try again.",
        alertSeverity: "error",
      });
    }
  } catch (err) {
    res.status(400).send({
      message: "An error has occured. Please try again.",
      alertSeverity: "error",
    });
  }
};
