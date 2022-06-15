var express = require("express");
var path = require("path");
let cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var carouselsRouter = require("./routes/carousel");

let mongoDb = require("./db");

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoDb.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database Connected!");
    },
    (error) => {
      console.log(error);
    }
  );

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/carousel", carouselsRouter);

app.use(function (err, req, res, next) {
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
