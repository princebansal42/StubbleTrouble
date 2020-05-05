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
    if (["admin", "farmer", "buyer"].indexOf(userType) === -1)
        return res
            .status(401)
            .json({ errors: [{ msg: "Not Authorised to Access this area." }] });

    let query = {};
    // if (userType === "farmer")
    //     query = { shipping: { seller: { seller_id: id } } };
    // if (userType === "buyer")
    //     query = { shipping: { customer: { customer_id: id } } };
    // console.log(query);
    if (userType === "farmer") query = { seller: id };
    if (userType === "buyer") query = { customer: id };
    console.log(query);
    try {
        const orders = await Order.find(query);
        return res.json(orders);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

// // @route POST api/orders
// // @desc Add a Order
// // @access Private

// // TODO -> Add custom Validatior
// router.post("/", auth, async (req, res) => {
//     // TODO -> Place Authorization validation in a middleware

//     // Check if the user placing order is a buyer
//     const { id, userType } = req.user;
//     // if (userType !== "buyer")
//     //     return res.status(401).json({
//     //         errors: [{ msg: "Not Authorised to Access this area." }]
//     //     });

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { shipping, products, payment } = req.body;
//     try {
//         let order = new Order({
//             shipping,
//             products,
//             payment,
//         });
//         order = await order.save();
//         return res.json(order);
//     } catch (err) {
//         console.error(err.message);
//         return res.status(500).send("Server Error");
//     }
// });

// // @route   DELETE api/orders/:order_id
// // @desc    Delete a Order
// // @access  Private

// router.delete("/:order_id", auth, async (req, res) => {
//     const { id, userType } = req.user;
//     if (userType !== "buyer")
//         return res.status(401).json({
//             errors: [{ msg: "User not authorized" }],
//         });
//     try {
//         const order = await Order.findById(req.params.order_id);

//         if (!order) {
//             return res.status(404).json({ msg: "Order not found" });
//         }
//         // Only the user who owns a order can delete the post

//         // Check User
//         if (order.shipping.customer.toString() !== id) {
//             return res.status(401).json({ msg: "User not authorized" });
//         }

//         await order.remove();
//         res.json({ msg: "Order removed" });
//     } catch (err) {
//         console.error(err.message);
//         if (err.kind === "ObjectId") {
//             return res.status(404).json({ msg: "Order not found" });
//         }
//         res.status(500).send("Server Error");
//     }
// });

// TODO Add Route to update Order

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
            return res.status(404).json({ msg: "Order not found" });
        }

        if (
            (userType === "buyer" && order.buyer.toString() !== id) ||
            (userType === "farmer" && order.seller.toString() !== id)
        ) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        return res.json(order);
    } catch (err) {
        console.error(err.message);
        if (err.kind == "ObjectId") {
            return res.status(400).json({ msg: "Order Not Found" });
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;
