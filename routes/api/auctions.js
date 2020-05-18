const express = require("express");
const router = express.Router();
const Auction = require("../../models/Auction");
const Farm = require("../../models/Farm");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const { auctionCache, accepting } = require("../../auctionCache");
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
    console.log(userType);

    if (userType !== "buyer" && userType !== "admin")
        return res.status(401).json({
            errors: [{ msg: "User not authorized" }],
        });
    let auction;
    console.log("ID of Auction " + auction_id);
    if (!accepting)
        return res.status(401).json({
            errors: [{ msg: "Auction Not open yet" }],
        });
    if (!auctionCache[auction_id]) {
        return res.status(404).json({ msg: "Auction not found" });
    }

    console.log(auctionCache);
    return res.json({ last_bid: auctionCache[auction_id].last_bid });
});
module.exports = router;
