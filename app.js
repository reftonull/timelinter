require("./db");
require("./auth");

const passport = require("passport");
const express = require("express");
const cors = require("cors");

const api = require("./routes/api");
const secureRoute = require('./routes/secure');

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

// passport setup
app.use(passport.initialize());

app.use("/api", api);
app.use('/secure', passport.authenticate('jwt', { session: false }), secureRoute);

app.listen(process.env.PORT || 3000);
