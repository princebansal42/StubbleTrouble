const express = require("express");
const app = express();
const cors = require("cors");
const Auction = require("./models/Auction");
const cron = require("node-cron");
const { auctionCache, accepting } = require("./auctionCache");

cron.schedule("0 9 * * *", async () => {
    let auction = await Auction.updateMany(
        { status: "PENDING" },
        { status: "ACTIVE" }
    );
    // let auctions = await Auction.find({ status: "ACTIVE" });
    // for (let auction of auctions) {
    //     auctionCache[auction.id] = {
    //         last_bid: null,
    //     };
    // }
    accepting = true;
});
cron.schedule("30 9 * * *", async () => {
    accepting = false;

    let auction = await Auction.updateMany(
        { status: "ACTIVE" },
        { status: "PENDING" }
    );
    // let auctions = await Auction.find({ status: "ACTIVE" });
    // for (let auction of auctions) {
    //     auction.last_bid = auctionCache[auction.id].last_bid;
    //     await auction.save();
    // }
    // auctionCache = {};
});
// Connecting Database
const connectDB = require("./config/db");
connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

// Routes Defined here
const routes = require("./routes");
app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running at " + PORT));
