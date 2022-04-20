require("./db");
require("./auth");

const passport = require("passport");
const express = require("express");

const api = require("./routes/api");
const secureRoute = require('./routes/secure');

const app = express();

app.use(express.urlencoded({ extended: false }));

// passport setup
app.use(passport.initialize());

app.use("/api", api);
app.use('/secure', passport.authenticate('jwt', { session: false }), secureRoute);

app.listen(3000);
