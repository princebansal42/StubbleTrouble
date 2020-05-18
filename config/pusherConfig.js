const PusherServer = require("pusher");
const PusherClient = require("pusher-js");
const config = require("config");
const { auctionCache, accepting } = require("../auctionCache");
const jwt = require("jsonwebtoken");

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

bidChannel.bind("add", (data) => {
    const { auction_id, bidPrice, token } = data;
    if (auctionCache[auction_id && accepting]) {
        let decoded;
        try {
            decoded = jwt.verify(token, config.get("jwtSecretKey"));
        } catch (err) {
            console.log(err);
        }
        if (auctionCache[auction_id].last_bid.price < bidPrice) {
            auctionCache[auction_id].last_bid = {
                price: bidPrice,
                user: decoded.id,
                time: Date.now(),
            };
            pusherServer.trigger(
                "bids",
                `new-${auction_id}`,
                auctionCache[auction_id].last_bid
            );
        }
    } else console.log("NO VALID AUCTION");
});

module.exports = {
    pusherClient,
    pusherServer,
};
