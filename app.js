const express = require("express");
const bodyParser = require("body-parser");
const CONFIG = require("./config/config");
const connectToDB = require("./db/mongodb");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
dotenv.config();

//Routes
const bookRouter = require("./routes/books_routes");
const authorRouter = require("./routes/author_routes");

// Connect to Mongodb Database
connectToDB();

//Add Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/authors", authorRouter);

app.get("/", (req, res) => {
  res.send("Hey! its a Bookstore");
});

//Error handler middleware
app.use((err, req, res, next) => {
  console.log(err);
  const errorStatus = err.status || 500;
  res.status(errorStatus).send(err.message);
  next();
});

app.listen(CONFIG.PORT, () => {
  console.log(`Server is up on http://localhost:${CONFIG.PORT}`);
});
