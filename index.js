const express = require("express");
const app = express();
const cors = require("cors");
const Auction = require("./models/Auction");
const Order = require("./models/Order");
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
cron.schedule("08 20 * * *", async () => {
    console.log("-------- Auction Ending.... --------");
    // accepting = false;
    console.log(Date.now());

    let auctions = await Auction.find({ status: "ACTIVE" });
    console.log(auctions);

    let orders = [];
    auctions.forEach((auction) => {
        if (auction.last_bid) {
            let order = new Order({
                seller: auction.owner,
                buyer: auction.last_bid.user,
                cost: auction.last_bid.bidPrice,
                auction: auction._id,
            });
            console.log(order);
            orders.push(order);
        }
    });
    // for (let auction in auctions) {
    //     if (auction.last_bid) {
    //         let order = new Order({
    //             seller: auction.owner,
    //             buyer: auction.last_bid.user,
    //             cost: auction.last_bid.bidPrice,
    //             auction: auction._id,
    //         });
    //         console.log(order);
    //         orders.push(order);
    //     }
    // }
    console.log(orders);
    await Auction.updateMany({ status: "ACTIVE" }, { status: "CLOSED" });

    orders.forEach(async (order) => {
        await order.save();
    });
    // for (let order in orders) {
    //     console.log(order);
    //     await order.save();
    // }
    console.log("-------- Auction Ended.... --------");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running at " + PORT));
