const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
// const adminAuth = require("../../middleware/adminAuth");

// @route GET api/orders
// @desc Get all orders
// @access Private

router.get("/", auth, async (req, res) => {
    const { id, userType } = req.user;
    // let query = {};
    // if (userType === "farmer") query = { seller: id };
    // if (userType === "buyer") query = { buyer: id };
    // console.log(query);
    try {
        const orders = await Order.find({
            $or: [{ seller: id }, { buyer: id }],
        });
        return res.json(orders);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json([{ msg: "Server Error" }]);
    }
});

// @route PUT api/orders/:order_id/address
// @desc  Add address to order
// @access Private

router.put(":/order_id/address", auth, async (req, res) => {
    const { id, userType } = req.user;
    try {
        let order = await Order.findById(req.params.order_id);

        if (!order) {
            return res.status(404).json([{ msg: "Order not found" }]);
        }
        if (order.buyer.toString() !== id && userType === "buyer") {
            return res.status(401).json([{ msg: "User not authorized" }]);
        }

        order.address = req.body.address;
        order = await order.save();
        return res.json(order);
    } catch (err) {
        console.error(err.message);
        if (err.kind == "ObjectId") {
            return res.status(400).json([{ msg: "Order Not Found" }]);
        }
        res.status(500).json([{ msg: "Server Error" }]);
    }
});

// @route   GET api/orders/:order_id
// @desc    Get a specific order
// @access  Private

router.get("/:order_id", auth, async (req, res) => {
    const { id, userType } = req.user;
    if (["buyer", "farmer"].indexOf(userType) === -1)
        return res.status(401).json({
            errors: [{ msg: "User not authorized" }],
        });
    try {
        const order = await Order.findById(req.params.order_id);

        if (!order) {
            return res.status(404).json([{ msg: "Order not found" }]);
        }

        if (
            (userType === "buyer" && order.buyer.toString() !== id) ||
            (userType === "farmer" && order.seller.toString() !== id)
        ) {
            return res.status(401).json([{ msg: "User not authorized" }]);
        }

        return res.json(order);
    } catch (err) {
        console.error(err.message);
        if (err.kind == "ObjectId") {
            return res.status(400).json([{ msg: "Order Not Found" }]);
        }
        res.status(500).json([{ msg: "Server Error" }]);
    }
});

module.exports = router;
