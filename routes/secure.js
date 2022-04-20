const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Timeline = mongoose.model("Timeline");
const Person = mongoose.model("Person");

router.get("/profile", (req, res, next) => {
    res.json({
        message: "You made it to the secure route",
        user: req.user,
        token: req.query.secret_token,
    });
});

router.get("/timelines", async (req, res, next) => {
    const timelines = await Timeline.find({}).exec();
    console.log(timelines);

    res.json({
        timelines: timelines,
    });
});

router.get("/timelines/add", async (req, res, next) => {
    const timelines = await Timeline.find({}).exec();
    console.log(timelines);

    res.json({
        timelines: timelines,
    });
});

router.get("/people", async (req, res, next) => {
    const people = await Person.find({}).exec();
    console.log(people);

    res.json({
        people: people,
    });
});

router.get("/people/add", async (req, res, next) => {
    const people = await Person.find({}).exec();
    console.log(people);

    res.json({
        people: people,
    });
});

module.exports = router;
