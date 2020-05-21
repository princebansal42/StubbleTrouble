const express = require("express");
const app = express();
const cors = require("cors");
const Auction = require("./models/Auction");
const cron = require("node-cron");
const { auctionCache, accepting } = require("./auctionCache");

// const { pusherClient, pusherServer } = require("./config/pusherConfig");
// Connecting Database
const connectDB = require("./config/db");
connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

// Routes Defined here
const routes = require("./routes");
app.use(routes);

cron.schedule("27 22 * * *", async () => {
    console.log("-------- Auction Starting.... --------");
    console.log(Date.now());
    await Auction.updateMany({ status: "PENDING" }, { status: "ACTIVE" });
    // let auctions = await Auction.find({ status: "ACTIVE" });
    // for (let auction of auctions) {
    //     auctionCache[auction.id] = {
    //         last_bid: null,
    //     };
    // }
    console.log("-------- Auction Started.... --------");
    // accepting = true;
});
cron.schedule("29 22 * * *", async () => {
    console.log("-------- Auction Ending.... --------");
    // accepting = false;
    console.log(Date.now());
    await Auction.updateMany({ status: "ACTIVE" }, { status: "CLOSED" });
    // let auctions = await Auction.find({ status: "ACTIVE" });
    // for (let auction of auctions) {
    //     auction.last_bid = auctionCache[auction.id].last_bid;
    //     await auction.save();
    // }
    // auctionCache = {};
    console.log("-------- Auction Ended.... --------");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running at " + PORT));
