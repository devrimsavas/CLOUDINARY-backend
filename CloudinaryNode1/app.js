const express = require("express");
const PORT = 3000;

//routes
var indexRoute = require("./routes/index.js");
var cookieParser = require("cookie-parser");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", indexRoute);

app.listen(PORT, () => {
  console.log(`service at the port ${PORT}`);
});

module.exports = app;
