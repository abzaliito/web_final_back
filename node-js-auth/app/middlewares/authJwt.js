const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (user && user.roles.includes("admin")) {
            next();
            return;
        }
        res.status(403).send({ message: "Require Admin Role!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const authJwt = {
    verifyToken,
    isAdmin
};
module.exports = authJwt;
