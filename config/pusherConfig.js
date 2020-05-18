const PusherServer = require("pusher");
const PusherClient = require("pusher-js");
const config = require("config");
const { auctionCache, accepting } = require("../auctionCache");
const jwt = require("jsonwebtoken");

const Auction = require("../models/Auction");
const pusherServer = new PusherServer({
    appId: config.get("pusher-appId"),
    key: config.get("pusher-key"),
    secret: config.get("pusher-secret"),
    cluster: config.get("pusher-cluster"),
    encrypted: true,
});

const pusherClient = new PusherClient(config.get("pusher-key"), {
    cluster: config.get("pusher-cluster"),
});

const bidChannel = pusherClient.subscribe("bids");

bidChannel.bind("add", async (data) => {
    const { auction_id, bidPrice, token } = data;
    let decoded;
    try {
        decoded = jwt.verify(token, config.get("jwtSecretKey"));
    } catch (err) {
        console.log(err);
    }
    let auction = await Auction.findById(auction_id);
    if (auction && auction.status !== "ACTIVE") {
        if (!auction.last_bid && bidPrice > auction.last_bid.bidPrice) {
            let last_bid = {
                bidPrice,
                user: decoded.id,
                time: Date.now(),
            };
            auction.last_bid = last_bid;
            auction = await auction.save();
            pusherServer.trigger("bids", `new-${auction_id}`, last_bid);
        }
    }

    // if (auctionCache[auction_id && accepting]) {
    //     if (auctionCache[auction_id].last_bid.price < bidPrice) {
    //         auctionCache[auction_id].last_bid = {
    //             price: bidPrice,
    //             user: decoded.id,
    //             time: Date.now(),
    //         };

    // } else console.log("NO VALID AUCTION");
});

module.exports = {
    pusherClient,
    pusherServer,
};
