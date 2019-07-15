const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();
const passport = require("passport");
const logger = require("./config/logger");
const customer = require("./api/customers");
const services = require("./api/services");
const vendor = require("./api/vendors");

require("./config/db");

const indexRouter = require("./routes/index");

const app = express();

app.use(passport.initialize());
app.use(morgan("combined", { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", indexRouter);
app.use("/api/customers", customer.routes);
app.use("/api/services", services.routes);
app.use("/api/vendors", vendor.routes);

module.exports = app;
