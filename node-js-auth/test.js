console.log("Starting test...");
try {
    // console.log("Requiring dotenv...");
    // require("dotenv").config();
    console.log("Requiring mongoose...");
    const mongoose = require("mongoose");
    console.log("Requiring models...");
    const db = require("./app/models");

    console.log("Requiring auth controller...");
    const authController = require("./app/controllers/auth.controller");
    console.log("authController:", authController);

    console.log("Requiring user controller...");
    require("./app/controllers/user.controller");
    console.log("Requiring order controller...");
    require("./app/controllers/order.controller");

    console.log("Requiring cors...");
    const cors = require("cors");

    const mockApp = {
        use: () => { console.log("mockApp.use called"); },
        post: () => { console.log("mockApp.post called"); },
        get: () => { console.log("mockApp.get called"); },
        listen: () => { }
    };

    console.log("Requiring auth routes...");
    const authRoutes = require("./app/routes/auth.routes");
    console.log("Auth routes export type:", typeof authRoutes);
    authRoutes(mockApp);

    console.log("Requiring user routes...");
    require("./app/routes/user.routes")(mockApp);

    console.log("Requiring order routes...");
    require("./app/routes/order.routes")(mockApp);

    console.log("Test finished successfully.");
} catch (e) {
    console.error("Test failed with error:");
    console.error(e);
}
