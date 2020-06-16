const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");

const app = express();

const userRoutes = require("./api/routes/users");
const userDetailsRoutes = require("./api/routes/UserDetails");

const dbUrl =
  "mongodb://heroku_pqgssfnz:a9s6kk5cpte3juikctiq0vun7h@ds153775.mlab.com:53775/heroku_pqgssfnz";
// const dbUrl = "mongodb://localhost/secondApp";
const option = {
  swaggerOptions: {
    url: "http://petstore.swagger.io/v2/swagger.json",
  },
};

mongoose
  .connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((db) => {
    console.log("db");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(null, option));
app.use("/users", userRoutes);
app.use("/user-details", userDetailsRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
