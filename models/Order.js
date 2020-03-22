const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    created_on: {
        type: Date,
        required: true,
        default: Date.now()
    },
    shipping: {
        customer: {
            name: {
                type: String,
                required: true
            },
            customer_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        },
        seller: {
            name: {
                type: String,
                require: true
            },
            seller_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        },
        address: {
            type: "String",
            required: true
        },
        city: {
            type: "String",
            required: true
        },
        state: {
            type: "String",
            required: true
        },
        country: {
            type: "String",
            required: true
        },
        delivery_notes: {
            type: "String"
        }
    },
    products: {
        title: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        unit_cost: {
            type: Number,
            required: true
        }
    },
    payment: {
        method: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        },
        paid: {
            type: Boolean,
            required: true
        },
        transaction_id: {
            type: String
        }
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
