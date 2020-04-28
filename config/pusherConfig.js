const PusherServer = require("pusher");
const PusherClient = require("pusher-js");
const config = require("config");
const auctionCache = require("../auctionCache");
const jwt = require("jsonwebtoken");

const Auction = require("../models/Auction");
const Order = require("../models/Order");
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

let timeout;

bidChannel.bind("add", (data) => {
    const { auction_id, bidPrice, token } = data;
    if (auctionCache[auction_id]) {
        let decoded;
        try {
            decoded = jwt.verify(token, config.get("jwtSecretKey"));
        } catch (err) {
            console.log(err);
        }
        if (
            auctionCache[auction_id].registered_users.indexOf(auction_id) !== -1
        ) {
            if (bidPrice > auctionCache[auction_id].last_bid.price) {
                if (timeout) {
                    clearInterval(timeout);
                }
                auctionCache[auction_id].last_bid = {
                    price: bidPrice,
                    user: decoded.id,
                    time: Date.now(),
                };
                timeout = setTimeout(async () => {
                    let winner = auctionCache[auction_id].last_bid;
                    delete auctionCache[auction_id];
                    pusherServer.trigger(
                        "bids",
                        "complete",
                        auctionCache[auction_id].last_bid
                    );
                    try {
                        const auction = await Auction.findById(auction_id);
                        auction.final_price = winner.price;
                        auction.winner = winner.user;
                        await auction.save();
                    } catch (err) {
                        console.log(err);
                    }
                }, 60000);
                pusherServer.trigger(
                    "bids",
                    "new",
                    auctionCache[auction_id].last_bid
                );
            }
        }
    } else console.log("NO VALID AUCTION");
});

module.exports = {
    pusherClient,
    pusherServer,
};
