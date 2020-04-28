const express = require("express");
const router = express.Router();
const Auction = require("../../models/Auction");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const auctionCache = require("../../auctionCache");
// const adminAuth = require("../../middleware/adminAuth");

// @route GET api/auctions
// @desc Get all auctions
// @access Private

router.get("/", auth, async (req, res) => {
    const { id, userType } = req.user;
    try {
        const auctions = await Auction.find({});
        return res.json(auctions);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
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

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { farm, description, start_time, starting_price } = req.body;
    try {
        let auction = new Auction({
            owner: id,
            farm,
            description,
            start_time,
            starting_price,
        });
        auction = await auction.save();
        return res.json(auction);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

// @route GET api/auctions/:id
// @desc Get an auction
// @access Private

router.get("/:auction_id", auth, async (req, res) => {
    const { id, userType } = req.user;
    try {
        const auction = await Auction.findById(req.params.auction_id);
        return res.json(auction);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
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

        await auction.remove();
        res.json({ msg: "Auction removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Auction not found" });
        }
        res.status(500).send("Server Error");
    }
});

// @route   POST api/auctions/join/:id
// @desc    Join an auction
// @access  Private

router.post("/join/:auction_id", auth, async (req, res) => {
    const { id, userType } = req.user;
    const { auction_id } = req.params;
    if (userType !== "buyer" || userType !== "admin")
        return res.status(401).json({
            errors: [{ msg: "User not authorized" }],
        });
    let auction;
    if (!auctionCache[auction_id]) {
        try {
            let auction = await Auction.findById(auction_id);
            if (!auction) {
                return res.status(404).json({ msg: "Auction not found" });
            }
            auctionCache[auction_id] = {
                registered_users: [],
                // price:null,
                last_bid: null,
            };
        } catch (err) {
            console.error(err.message);
            if (err.kind === "ObjectId") {
                return res.status(404).json({ msg: "Auction not found" });
            }
            res.status(500).send("Server Error");
        }
    }

    auctionCache[auction_id].registered_users.push(id);
    if (!auctionCache[auction_id].last_bid) {
        // auctionCache[auction_id].price = auction.starting_price;
        auctionCache[auction_id].last_bid = {
            price: auction.starting_price,
            time: Date.now(),
            user: id,
        };
    }
    res.json({ last_bid: auctionCache[auction_id].last_bid });
});
module.exports = router;
