const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    location: {
        lat: {
            type: Number,
            required: true,
        },
        long: {
            type: Number,
            required: true,
        },
    },
});

const Farm = mongoose.model("Farm", farmSchema);
module.exports = Farm;
