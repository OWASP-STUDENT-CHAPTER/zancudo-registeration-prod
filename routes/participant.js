const express = require("express");
const passport = require("passport");

// * Middleware
const { login } = require("../Middleware/auth");

// * Validators
const { register } = require("../utils/validation/validators");

// * Model
const Participant = require("../models/Participant");

// * API Endpoints -->
const router = express.Router();

// * Sign up Participant
router.post(
  "/signup",
  (req, res, next) => {
    req.session.route = "signup";
    // console.log(req.body);
    const { value, error } = register(req.body);
    if (error)
      return res.redirect(
        `${process.env.CLIENT_URL}/error?err=Validation Error ${error.details[0].message}`
      );
    req.session.body = value;
    return next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// * Auth Callback
router.get("/auth/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    {
      scope: ["profile", "email"],
    },
    function (err, user, info) {
      // console.log(err, user, info);
      if (!user)
        return res.redirect(
          `${process.env.CLIENT_URL}/error?err=${info?.message}`
        );
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect(`${process.env.CLIENT_URL}/`);
      });
    }
  )(req, res, next);
});

// * Login Participant
router.get(
  "/login",
  (req, res, next) => {
    req.session.route = "login";
    return next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// * Load User
router.get("/profile", login, async (req, res) => {
  try {
    const user = await Participant.findById(req.user._id)
      .populate("teams")
      .exec();
    if (!user)
      return res.status(404).json({ body: null, error: "User does not exist" });

    return res.status(200).json({ body: user, error: null });
  } catch (error) {
    console.error("Error occured here \n", error);
    return res.status(500).json({ body: null, error: "Server Error." });
  }
});

// * Log Out user
router.get("/logout", async (req, res) => {
  try {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    console.error("Error occured here \n", error);
    return res.status(500).json({ body: null, error: "Server Error." });
  }
});

// * End of API Endpoints -->
module.exports = router;
