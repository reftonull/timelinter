const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Timeline = mongoose.model("Timeline");
const Person = mongoose.model("Person");
const { secret } = require("../config");
const jwt = require("jsonwebtoken");

router.get("/profile", (req, res) => {
    const data = jwt.verify(req.query.secret_token, secret);

    res.json({
        user: data.user,
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

router.post("/timeline/addperson", async (req, res) => {
    try {
        const timeline = await Timeline.findById(req.body.tid).exec();
        timeline.people.push(req.body.pid);

        const doc = await timeline.save();

        console.log("timeline is ", doc);
        res.json({
            success: true,
            timeline: doc,
        });
    } catch (e) {
        console.log(e);
        res.json({ success: false, err: "An error occured." });
    }
});

router.post("/timeline/update", async (req, res) => {
    const tid = req.body.tid;
    const blocks = req.body.blocks;

    console.log(blocks);

    const timeline = await Timeline.findById(tid).exec();

    timeline.blocks = blocks;

    const doc = await timeline.save();

    console.log(doc);

    res.json({
        success: true,
        timeline: doc,
    });
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
    const people = await Person.find({ user: req.query.id }).exec();
    console.log(people);

    res.json({
        people: people,
    });
});

router.get("/person", async (req, res) => {
    const personId = req.query.pid;
    const person = await Person.findById(personId).exec();

    console.log(person);

    res.json({
        person,
    });
});

router.post("/person/update", async (req, res) => {
    const avail = req.body.avail;
    const pid = req.body.pid;

    try {
        const person = await Person.findById(pid).exec();

        const blocks = avail.map((a) => {
            return { startTime: a.startTime, endTime: a.endTime, person: pid };
        });

        person.availability = blocks;

        const doc = await person.save();
        console.log(doc);

        res.json({
            success: true,
        });
    } catch (e) {
        res.json({
            success: false,
        });
    }
});

module.exports = router;
