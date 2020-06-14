const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        address: {
            type: String,
            // required: true,
        },
        // location: {
        //     lat: {
        //         type: Number,
        //         required: true,
        //     },
        //     long: {
        //         type: Number,
        //         required: true,
        //     },
        // },
        cost: {
            type: Number,
            required: true,
        },
        auction: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Auction",
            required: true,
        },
        //     products: {
        //         title: {
        //             type: String,
        //             required: true,
        //         },
        //         quantity: {
        //             type: Number,
        //             required: true,
        //         },
        //         unit_cost: {
        //             type: Number,
        //             required: true,
        //         },
        //     },
        //     payment: {
        //         method: {
        //             type: String,
        //             required: true,
        //         },
        //         cost: {
        //             type: Number,
        //             required: true,
        //         },
        //         paid: {
        //             type: Boolean,
        //             required: true,
        //         },
        //         transaction_id: {
        //             type: String,
        //         },
        //     },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
