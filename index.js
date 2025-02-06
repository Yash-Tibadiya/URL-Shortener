const express = require("express");
const { logReqRes } = require("./middlewares/index.js");
const { connectMongoDb } = require("./connection.js");
const urlRoute = require("./routes/url.js");
const URL = require("./models/url.js");

const app = express();
const port = 8000;

//! Connect to MongoDB
connectMongoDb("mongodb://localhost:27017/short-url");

//! Middleware - Plugin
app.use(express.json());
app.use(logReqRes("log.txt"));

//! Router
app.use("/", urlRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
