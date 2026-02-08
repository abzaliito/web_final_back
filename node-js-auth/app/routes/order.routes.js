const { authJwt, validation } = require("../middlewares");
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
        [authJwt.verifyToken, validation.validateOrder],
        controller.createOrder
    );

    app.get(
        "/api/orders",
        [authJwt.verifyToken],
        controller.getUserOrders
    );

    app.get(
        "/api/orders/:id",
        [authJwt.verifyToken],
        controller.getOrder
    );

    app.put(
        "/api/orders/:id",
        [authJwt.verifyToken],
        controller.updateOrder
    );

    app.delete(
        "/api/orders/:id",
        [authJwt.verifyToken],
        controller.deleteOrder
    );
};
