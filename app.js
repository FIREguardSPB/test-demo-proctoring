const express = require("express");
const useMiddleware = require("./middleware");
const indexRouter = require("./routes/index");
const tokenRouter = require("./routes/token")
const reportRouter = require("./routes/report")
const stayOn = require("./routes/stayOnline")
const useErrorHandlers = require("./middleware/error-handlers");

const app = express();
useMiddleware(app);

// Подключаем импортированные маршруты с определенным url префиксом.
app.use("/", indexRouter);
app.use("/api/token", tokenRouter);
app.use("/api/report", reportRouter);
app.use("/api/stayOnline", stayOn);
useErrorHandlers(app);

module.exports = app;
