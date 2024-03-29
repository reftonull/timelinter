const mongoose = require("mongoose");
const passport = require("passport");
const { secret, googleClientId, googleClientSecret } = require("./config");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth20");
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = mongoose.model("User");

passport.use(
    "register",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = await User.create({
                    email,
                    password,
                    lists: [],
                    people: [],
                    timelines: [],
                });
                return done(null, user);
            } catch (e) {
                done(e);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false, { message: "User not found" });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: "Wrong password" });
                }

                return done(null, user, { message: "Logged in successfully" });
            } catch (e) {
                done(e);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: secret,
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    new GoogleStrategy(
        {
            clientID: googleClientId,
            clientSecret: googleClientSecret,
            callbackURL: "/api/oauth2/redirect/google",
            scope: [
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/calendar.events.readonly",
                "https://www.googleapis.com/auth/calendar.readonly",
            ],
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(
                "accessToken + refreshToken",
                accessToken,
                refreshToken
            );
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        console.log(id);
        done(err, user);
    });
});
