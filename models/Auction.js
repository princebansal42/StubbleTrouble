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
        start_time: {
            type: Date,
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
    },
    { timestamps: true }
);

const Auction = mongoose.model("Auction", auctionSchema);
module.exports = Auction;
