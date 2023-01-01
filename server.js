// * NPM Packages

const envConfig = {
  path: process.env.NODE_ENV === "production" ? "prod.env" : ".env",
};

require("dotenv").config(envConfig);

console.log(process.env.CLIENT_URL);
console.log(process.env.SERVER_URL);

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("./config/passport");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const helmet = require("helmet");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const app = express();

// * DB Connection
const connectDB = async  () => {
  try{
    const conn = await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      return console.log(`Connected to MongoDB ${conn.connection.host}`);
  }
  catch(err){
    return console.log("Connection to MongoDB failed.\n", err);
  }
}

// * Middleware

// this -->
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(passport.initialize());
app.use(passport.session());



// * Importing router
const user = require("./routes/participant");
const team = require("./routes/team");
const event = require("./routes/event");

// // this -->
app.use(
  csrf({
    cookie: {
      // secure: true,
      httpOnly: true,
      maxAge: 8 * 60 * 60 * 1000,
    },
  })
);

app.use(function (req, res, next) {
  var token = req.csrfToken();
  res.cookie("XSRF-TOKEN", token);
  res.locals.csrfToken = token;
  res.locals._csrf = token;
  next();
});

// * Routing Setup
app.use("/api/user", user);
app.use("/api/team", team);
app.use("/api/event", event);


// * Server Setup
const port = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(port, console.log(`Server Started on port ${port}`));
})

app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: process.env.COOKIESECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000, /*secure: true,*/ httpOnly: true },
  })
);

// * Production setup
if (process.env.NODE_ENV === "production") {
  console.log("prod");
  app.use(express.static(path.join(__dirname, "./Client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./Client/build/index.html"));
    res.cookie("XSRF-TOKEN", req.csrfToken());
  });
}
// if (process.env.NODE_ENV === "production") {
//   console.log("production", envConfig);
//   app.use(express.static(path.resolve(__dirname, "Client", "build")));
//   app.get("/*", function (req, res) {
//     // this -->
//     res.cookie("XSRF-TOKEN", req.csrfToken());
//     res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
//   });
// }

// app.use("/static", express.static(__dirname + "\\Client\\src\\assets"));
// console.log(__dirname + "\\Client");

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
});

process.on("uncaughtException", (err, promise) => {
  console.log(`Error: ${err.message}`);
});
