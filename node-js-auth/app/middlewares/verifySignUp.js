const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        console.log("Checking duplicates for:", req.body);
        // Username
        const userByUsername = await User.findOne({ username: req.body.username });
        if (userByUsername) {
            console.log("Username duplicate found:", req.body.username);
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }

        // Email
        const userByEmail = await User.findOne({ email: req.body.email });
        if (userByEmail) {
            console.log("Email duplicate found:", req.body.email);
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }

        console.log("No duplicates found.");
        next();
    } catch (err) {
        console.error("verifySignUp error:", err);
        res.status(500).send({ message: err.message });
    }
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;
