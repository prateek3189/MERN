const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placeRoutes = require("./routes/places-routes.js");
const userRoutes = require("./routes/users-routes.js");
const HttpError = require("./models/http-error.js");

const app = express();

// Middleware
app.use(bodyParser.json());

app.use("/api/places", placeRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not found the route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({
    message: error.message || "Unknown Error - Something went wrong",
  });
});

// Database Connection
mongoose
  .connect(
    "mongodb+srv://admin:admin3189@cluster0.pog16.mongodb.net/traveller?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
