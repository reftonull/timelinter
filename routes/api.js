const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { secret } = require("../config.js");

router.post(
    "/register",
    passport.authenticate("register", { session: false }),
    async (req, res) => {
        res.json({
            success: true,
            message: "Signup successful",
        });
    }
);

router.post("/login", async (req, res, next) => {
    passport.authenticate("login", async (err, user) => {
        try {
            if (err || !user) {
                return res.json({ success: false, error: "Login failed." });
            }

            req.login(user, { session: false }, async (error) => {
                if (error) {
                    return next(error);
                }

                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, secret);

                return res.json({ success: true, token, user: body });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.get("/test", async (req, res) => {
    console.log("testing here");
    res.redirect("/");
});

router.get("/google", passport.authenticate("google"));

router.get(
    "/oauth2/redirect/google",
    passport.authenticate("google", {
        failureRedirect: "/api/test",
    }),
    function (req, res) {
        res.redirect("/");
    }
);

module.exports = router;
