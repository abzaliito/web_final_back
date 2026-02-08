const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.userId, {
            username: req.body.username,
            email: req.body.email
        }, { new: true });

        if (!user) {
            return res.status(404).send({ message: "User not found to update." });
        }

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles,
            message: "Profile updated successfully!"
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
