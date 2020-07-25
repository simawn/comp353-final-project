const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const userRouter = require('./routes/user');
const bookRouter = require('./routes/book');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', userRouter);
app.use('/', bookRouter);

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
