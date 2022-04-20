const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { mongoUrl } = require("./config.js");

const User = new mongoose.Schema({
    // username, password
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
    people: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
    timelines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Timeline" }],
});

User.pre("save", async function (next) {
    const user = this;
    try {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();
    } catch (e) {
        console.log("Error occured");
        next(e);
    }
});

User.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
};

const Block = new mongoose.Schema({
    person: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
});

const Person = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    availability: [Block],
});

const Timeline = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, reqired: true },
    blocks: [Block],
});

mongoose.model("User", User);
mongoose.model("Timeline", Timeline);
mongoose.model("Person", Person);
mongoose.connect(process.env.MONGODB_URI || mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
