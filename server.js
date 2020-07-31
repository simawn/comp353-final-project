const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");
const jobRouter = require("./routes/job");

/* Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* Routes */
app.use("/", userRouter);
app.use("/", bookRouter);
app.use("/", jobRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
