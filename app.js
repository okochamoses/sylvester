const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();
const logger = require("./config/logger");
const customer = require("./api/customers");

require("./config/db");

const indexRouter = require("./routes/index");

const app = express();

app.use(morgan("combined", { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", indexRouter);
app.use("/api/customers", customer.routes);

module.exports = app;
