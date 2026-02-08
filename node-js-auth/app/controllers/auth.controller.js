const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const transporter = require("../config/email.config");

exports.signup = async (req, res) => {
    console.log("Signup Request Body:", req.body);
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            roles: req.body.roles || ["user"]
        });

        const savedUser = await user.save();
        console.log("User saved:", savedUser._id);

        // Send Welcome Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Welcome to ElectroStore!",
            text: `Hello ${user.username},\n\nThank you for registering at ElectroStore! We are excited to have you.\n\nBest regards,\nElectroStore Team`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Email error: " + error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        res.send({ message: "User was registered successfully!" });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).send({ message: err.message || "Some error occurred while registering the user." });
    }
};

exports.signin = async (req, res) => {
    console.log("Signin Request:", req.body);
    try {
        const user = await User.findOne({
            $or: [{ username: req.body.username }, { email: req.body.username }]
        });

        if (!user) {
            console.log("User not found for:", req.body.username);
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            console.log("Invalid password for:", user.username);
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        var authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].toUpperCase());
        }

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    } catch (err) {
        console.error("Signin error:", err);
        res.status(500).send({ message: err.message || "Error logging in" });
    }
};
