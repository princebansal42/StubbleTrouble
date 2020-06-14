const express = require("express");
const router = express.Router();
const Auction = require("../../models/Auction");
const Farm = require("../../models/Farm");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const { auctionCache, accepting } = require("../../auctionCache");
// const adminAuth = require("../../middleware/adminAuth");

const config = require("config");
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: config.get("pusher-appId"),
    key: config.get("pusher-key"),
    secret: config.get("pusher-secret"),
    cluster: config.get("pusher-cluster"),
    useTLS: true,
});

// @route GET api/auctions
// @desc Get all auctions
// @access Private

router.get("/", auth, async (req, res) => {
    const { id, userType } = req.user;
    try {
        const auctions = await Auction.find({})
            .populate({
                path: "owner",
                select: "name",
            })
            .populate({
                path: "farm",
                select: "name",
            });
        // console.log(auctions);
        return res.json(auctions);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json([{ msg: "Server Error" }]);
    }
});

// @route POST api/auctions
// @desc Add an auction
// @access Private

router.post("/", auth, async (req, res) => {
    // Check if the user adding auction is a farmer
    const { id, userType } = req.user;
    if (userType !== "farmer")
        return res.status(401).json({
            errors: [{ msg: "Not Authorised to Access this area." }],
        });

    const { farm_id, description, starting_price } = req.body;
    try {
        const farm = await Farm.findById(farm_id);
        if (!farm)
            return res.status(404).json({
                errors: [{ msg: "Farm not Found." }],
            });

        if (farm.owner.toString() !== id) {
            return res.status(401).json({
                errors: [{ msg: "Not Authorised." }],
            });
        }

        let auction = new Auction({
            owner: id,
            farm: farm_id,
            description,
            starting_price,
        });
        auction = await auction.save();
        return res.json(auction);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json([{ msg: "Server Error" }]);
    }
});

// @route GET api/auctions/:id
// @desc Get an auction
// @access Private

router.get("/:auction_id", auth, async (req, res) => {
    const { id, userType } = req.user;
    try {
        const auction = await Auction.findById(req.params.auction_id);
        // .populate({
        //     path: "owner",
        //     select: "name",
        // });
        // .populate({
        //     path: "farm",
        //     select: "name",
        // });
        return res.json(auction);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json([{ msg: "Server Error" }]);
    }
});

// @route   DELETE api/auctions/:id
// @desc    Delete an auction
// @access  Private

router.delete("/:auction_id", auth, async (req, res) => {
    // Check if the user adding farm is a farmer
    const { id, userType } = req.user;
    if (userType !== "farmer")
        return res.status(401).json({
            errors: [{ msg: "User not authorized" }],
        });
    try {
        const auction = await Auction.findById(req.params.auction_id);

        if (!auction) {
            return res.status(404).json({ msg: "Auction not found" });
        }
        // Only the user who has created auction can delete the post
        // Check User
        if (auction.owner.toString() !== id) {
            return res.status(401).json({ msg: "User not authorized" });
        }
        if (auction.status !== "PENDING")
            return res
                .status(401)
                .json({ msg: "Auction currently active. Can't be deleted" });

        await auction.remove();
        res.json({ msg: "Auction removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Auction not found" });
        }
        res.status(500).json([{ msg: "Server Error" }]);
    }
});

// @route   POST api/auctions/:auction_id/bid
// @desc    Bid on an auctino
// @access  Private

router.post("/:auction_id/bid", auth, async (req, res) => {
    const { id, userType } = req.user;
    const { auction_id } = req.params;
    const { bidPrice } = req.body;
    console.log(userType);

    // if (userType !== "buyer" && userType !== "admin")
    //     return res.status(401).json({
    //         errors: [{ msg: "User not authorized" }],
    //     });
    // let auction;
    // console.log("ID of Auction " + auction_id);
    try {
        let auction = await Auction.findById(auction_id);
        if (!auction) return res.status(404).json({ msg: "Auction not found" });
        if (auction.status !== "ACTIVE")
            return res.status(401).json({
                errors: [{ msg: "Auction Not open yet" }],
            });

        let last_bid = {};
        // if (!auction.last_bid && bidPrice > auction.last_bid.bidPrice) {
        last_bid = {
            bidPrice,
            user: id,
            time: Date.now(),
        };
        // }
        auction.last_bid = last_bid;
        auction = await auction.save();
        pusher.trigger(`${auction_id}`, "new_bid", auction);
        console.log(auction);
        return res.json(auction);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Auction not found" });
        }
        res.status(500).json([{ msg: "Server Error" }]);
    }
});
module.exports = router;
