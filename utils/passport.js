const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../database');

module.exports = (passport) => {
  passport.use(new LocalStrategy(
    async (username, password, callback) => {
      try {
      // Assuming that all usernames are unique
        const userData = (await db.query(`SELECT * FROM User WHERE userName='${username}'`, { type: db.QueryTypes.SELECT }))[0];

        // Username is not found
        if (!userData) throw new Error('Username not found');

        // Check for password
        bcrypt.compare(password, userData.password, (err, success) => {
          if (err) throw err;
          if (success) {
            return callback(null, userData);
          }
          throw new Error('Password invalid');
        });
      } catch (error) {
        return callback(error.message, false);
      }
    },
  ));

  passport.serializeUser((user, callback) => {
    callback(null, user.userName);
  });

  passport.deserializeUser(async (userName, callback) => {
    try {
      const result = (await db.query(`SELECT * from User WHERE userName='${userName}'`))[0];
      if (!result[0]) throw new Error('Unable to find user');
      callback(null, result);
    } catch (error) {
      return callback(error);
    }
  });
};
