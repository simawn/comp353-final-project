const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../database');

exports.login = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { // eslint-disable-line
    try {
      if (err) throw err;
      if (!user) res.send('Unable to login');
      else {
      req.logIn(user, (err) => { //eslint-disable-line
          if (err) throw err;
          res.send('Successfully logged in');
        });
      }
    } catch (error) {
      console.log('Login error: ', error);
    }
  })(req, res, next);
};

exports.register = async (req, res) => {
  const { username, password, userType } = req.body;
  try {
    const result = (await db.query('SELECT * FROM User WHERE username=?', { replacements: [username], type: db.QueryTypes.SELECT }))[0];
    if (result) throw new Error('Username already exists!');

    const passwordEncrypt = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO User (username, password, type) VALUES (?, ?, ?)', { replacements: [username, passwordEncrypt, userType], type: db.QueryTypes.INSERT });

    res.sendStatus(200);
  } catch (error) {
    res.status(400).send({ error: 'Registration error', message: error });
  }
};

exports.logout = async (req, res) => {
  req.logout();
  res.sendStatus(200);
};
