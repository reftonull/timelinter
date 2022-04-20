const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Timeline = mongoose.model("Timeline");
const Person = mongoose.model("Person");

router.get("/profile", (req, res) => {
    res.json({
        message: "You made it to the secure route",
        user: req.user,
        token: req.query.secret_token,
    });
});

router.get("/timelines", async (req, res) => {
    console.log(req.query.id);
    const timelines = await Timeline.find({ user: req.query.id }).exec();
    console.log(timelines);

    res.json({
        timelines: timelines,
    });
});

router.post("/timelines/add", async (req, res) => {
    try {
        console.log(req.body.uid);
        const timeline = await Timeline.create({
            user: req.body.uid,
            name: req.body.name,
        });
        console.log(timeline);
        res.json({
            success: true,
        });
    } catch (e) {
        console.log(e);
        res.json({ success: false, err: "An error occured." });
    }
});

router.post("/people/add", async (req, res) => {
    try {
        console.log(req.body.uid);
        const person = await Person.create({
            user: req.body.uid,
            name: req.body.name,
        });
        console.log(person);
        res.json({
            success: true,
        });
    } catch (e) {
        console.log(e);
        res.json({ success: false, err: "An error occured." });
    }
});

router.get("/people", async (req, res) => {
    const people = await Person.find({user: req.query.id}).exec();
    console.log(people);

    res.json({
        people: people,
    });
});

module.exports = router;
