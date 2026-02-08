const mongoose = require("mongoose");
const db = require("./app/models");
const User = db.user;
require("dotenv").config();

console.log("Connecting to DB...");
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected. Listing users...");
        const users = await User.find({});
        console.log("Found " + users.length + " users:");
        users.forEach(u => {
            console.log(`- Username: '${u.username}', Email: '${u.email}', ID: ${u._id}`);
        });
        process.exit();
    })
    .catch(err => {
        console.error("DB Error:", err);
        process.exit(1);
    });
