const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const logger = require("./config/logger");

dotenv.config();
require("./config/db");

const indexRouter = require("./routes/index");

const app = express();

app.use(morgan("combined", { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

module.exports = app;
