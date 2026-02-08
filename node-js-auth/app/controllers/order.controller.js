const db = require("../models");
const Order = db.order;

exports.createOrder = async (req, res) => {
    try {
        const order = new Order({
            user: req.userId,
            products: req.body.products,
            totalAmount: req.body.totalAmount,
            status: req.body.status || "pending"
        });

        const savedOrder = await order.save();

        // Send Order Confirmation Email
        const User = db.user;
        const user = await User.findById(req.userId);

        if (user) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: "Order Confirmation - ElectroStore",
                text: `Hello ${user.username},\n\nThank you for your order! Your order ID is ${savedOrder._id}.\nTotal Amount: ${savedOrder.totalAmount}\n\nWe will notify you when it ships.\n\nBest regards,\nElectroStore Team`
            };
            const transporter = require("../config/email.config");
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Email error: " + error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        }

        res.send({ message: "Order was created successfully!", order: savedOrder });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId });
        res.status(200).send(orders);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, user: req.userId });
        if (!order) {
            return res.status(404).send({ message: "Order Not Found." });
        }
        res.status(200).send(order);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            req.body,
            { new: true } // Return the updated document
        );

        if (!order) {
            return res.status(404).send({ message: "Order Not Found." });
        }
        res.status(200).send({ message: "Order updated successfully!", order });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!order) {
            return res.status(404).send({ message: "Order Not Found." });
        }
        res.status(200).send({ message: "Order deleted successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
