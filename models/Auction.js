const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        farm: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Farm",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        starting_price: {
            type: Number,
            required: true,
        },
        final_price: {
            type: Number,
        },
        completed: {
            type: Boolean,
            default: false,
            required: true,
        },
        status: {
            type: String,
            default: "PENDING",
            required: true,
        },
        last_bid: {
            bidPrice: {
                type: Number,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            time: {
                type: Date,
            },
        },
    },
    { timestamps: true }
);

const Auction = mongoose.model("Auction", auctionSchema);
module.exports = Auction;
