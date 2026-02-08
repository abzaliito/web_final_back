console.log("Starting server.js...");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = require("./app/config/db.config.js");

console.log("Connecting to MongoDB...");
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        const productController = require("./app/controllers/product.controller");
        productController.seedProducts();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// Simple Route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to ElectroStore API." });
});

// Routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/product.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
