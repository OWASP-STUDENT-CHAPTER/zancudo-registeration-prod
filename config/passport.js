// * NPM Packages
const passport = require("passport");
const googleStrategy = require("passport-google-oauth2").Strategy;

// * Models
const Participant = require("../models/Participant");

// * Setting up Passport google strategy
passport.use(
  new googleStrategy(
    {
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/user/auth/callback`,
      passReqToCallback: true,
      proxy: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let participant = await Participant.findOne({ email: profile.email });

        if (!participant) {
          if (req.session.route === "login")
            return done(null, false, {
              message: "Permission Error Register to continue.",
            });

          const { body } = req.session;

          participant = new Participant({
            name: body.name,
            email: profile.email,
            profilePicLink: profile.picture,
            college: body.college,
            phoneNo: Number(body.phoneNo),
            rollNo: Number(body.rollNo),
            year: body.year,
          });

          await participant.save();
        }
        return done(null, participant, { message: "Login Successfull." });
      } catch (error) {
        console.error(error);
        return done(null, false, {
          message: "Request refused. Check your inputs.",
        });
      }
    }
  )
);

// * Passport serializeUser
passport.serializeUser((participant, done) => {
  done(null, participant._id);
});

// * Passport deserializeUser
passport.deserializeUser(async (id, done) => {
  const participant = await Participant.findById(id).exec();
  done(null, participant);
});
