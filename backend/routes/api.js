const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { secret } = require("../config.js");
const User = mongoose.model("User");

router.post(
    "/register",
    passport.authenticate("register", { session: false }),
    async (req, res) => {
        res.json({
            message: "Signup successful",
        });
    }
);

router.post("/login", async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err || !user) {
                return res.json({ error: "Login failed." })
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, secret);

                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;