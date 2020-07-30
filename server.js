const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
}));
app.use(cookieParser(config.sessionSecret));
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport')(passport);

const userRouter = require('./routes/user');
const bookRouter = require('./routes/book');
const authRouter = require('./routes/auth');

app.use('/', userRouter);
app.use('/', bookRouter);
app.use('/', authRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
