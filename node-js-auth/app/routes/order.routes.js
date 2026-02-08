const { authJwt } = require("../middlewares");
const controller = require("../controllers/order.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/orders",
        [authJwt.verifyToken],
        controller.createOrder
    );

    app.get(
        "/api/orders",
        [authJwt.verifyToken],
        controller.getUserOrders
    );
};
