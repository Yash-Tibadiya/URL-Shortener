const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require("./connection.js");
const { checkAuthentication, restrictTo } = require("./middlewares/auth.js");

const staticRoute = require("./routes/staticRouter.js");
const userRoute = require("./routes/user.js");
const urlRoute = require("./routes/url.js");

const app = express();
const port = 8000;

//! Connect to MongoDB
connectMongoDb("mongodb://localhost:27017/short-url");

//! View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//! Middleware - Plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthentication);

//! Router
app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
