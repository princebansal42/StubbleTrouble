import PusherServer from "pusher";
import PusherClient from "pusher-js";
let config = {
    "pusher-appId": "991405",
    "pusher-key": "b439e5441b9ccae8efcc",
    "pusher-secret": "2daf92084f82b9611efb",
    "pusher-cluster": "ap2",
};

const pusherServer = new PusherServer({
    appId: config["pusher-appId"],
    key: config["pusher-key"],
    secret: config["pusher-secret"],
    cluster: config["pusher-cluster"],
    encrypted: true,
});

const pusherClient = new PusherClient(config["pusher-key"], {
    cluster: config["pusher-cluster"],
});

const bidChannel = pusherClient.subscribe("bids");

// bidChannel.bind("add", async (data) => {
//     const { auction_id, bidPrice, token } = data;
//     let decoded;
//     try {
//         decoded = jwt.verify(token, config.get("jwtSecretKey"));
//     } catch (err) {
//         console.log(err);
//     }
//     let auction = await Auction.findById(auction_id);
//     if (auction && auction.status !== "ACTIVE") {
//         if (!auction.last_bid && bidPrice > auction.last_bid.bidPrice) {
//             let last_bid = {
//                 bidPrice,
//                 user: decoded.id,
//                 time: Date.now(),
//             };
//             auction.last_bid = last_bid;
//             auction = await auction.save();
//             pusherServer.trigger("bids", `new-${auction_id}`, last_bid);
//         }
//     }
// });
