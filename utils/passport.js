const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../database');

module.exports = (passport) => {
  passport.use(new LocalStrategy(
    async (username, password, callback) => {
      try {
      // Assuming that all usernames are unique
        const userData = (await db.query(`SELECT * FROM User WHERE username='${username}'`, { type: db.QueryTypes.SELECT }))[0];

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
    callback(null, user.id);
  });

  passport.deserializeUser(async (id, callback) => {
    try {
      const result = (await db.query(`SELECT * from User WHERE id=${id}`))[0];
      if (!result[0]) throw new Error('Unable to find user id');
      callback(null, result);
    } catch (error) {
      return callback(error);
    }
  });
};
