require("./db");
require("./auth");

const passport = require("passport");
const express = require("express");
const path = require("path");
const session = require("express-session");
const cors = require("cors");

const api = require("./routes/api");
const secureRoute = require("./routes/secure");
const { sessionSecret } = require("./config");

const app = express();

app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});
app.use(cors());
app.use(express.json({ extended: false }));
app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    })
);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "public")));
}

// passport setup
app.use(passport.initialize());

app.use("/api", api);
app.use(
    "/secure",
    passport.authenticate("jwt", { session: false }),
    secureRoute
);

app.get(/.*/, (req, res) =>
    res.sendFile(path.resolve(__dirname, "public/index.html"))
);

app.listen(`0.0.0.0:$${process.env.PORT}` || 3000);
