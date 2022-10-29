require("dotenv").config();

module.exports = {
    secret: process.env.JWT_KEY,
    mongoUrl: process.env.MONGODB_URI,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
};
