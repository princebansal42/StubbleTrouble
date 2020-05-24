const express = require("express");
const router = express.Router();
const Farm = require("../../models/Farm");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
// const adminAuth = require("../../middleware/adminAuth");

// @route GET api/farms
// @desc Get all farms
// @access Private

router.get("/", auth, async (req, res) => {
    const { id, userType } = req.user;
    if (["admin", "farmer"].indexOf(userType) === -1)
        return res
            .status(401)
            .json({ errors: [{ msg: "Not Authorised to Access this area." }] });

    let query = {};
    if (userType === "farmer")
        query = {
            owner: id,
        };
    try {
        const farms = await Farm.find(query);
        return res.json(farms);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

// @route POST api/farms
// @desc Add a Farm
// @access Private

router.post(
    "/",
    [
        auth,
        check("area", "Area is Required").not().isEmpty(),
        check("lat", "Latitude is Required").not().isEmpty(),
        check("long", "Longitude is Required").not().isEmpty(),
        check("address", "Address is Required").not().isEmpty(),
    ],
    async (req, res) => {
        // Check if the user adding farm is a farmer
        const { id, userType } = req.user;
        if (userType !== "farmer")
            return res.status(401).json({
                errors: [{ msg: "Not Authorised to Access this area." }],
            });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, area, lat, long, address } = req.body;
        try {
            let farm = new Farm({
                owner: id,
                name,
                area,
                address,
                location: {
                    lat,
                    long,
                },
            });
            farm = await farm.save();
            return res.json(farm);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server Error");
        }
    }
);

// @route GET api/farms/:id
// @desc Get a Farm
// @access Private

router.get("/:farm_id", auth, async (req, res) => {
    const { id, userType } = req.user;
    if (["admin", "farmer"].indexOf(userType) === -1)
        return res
            .status(401)
            .json({ errors: [{ msg: "Not Authorised to Access this area." }] });

    try {
        const farm = await Farm.findById(req.params.farm_id);
        return res.json(farm);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

// @route   DELETE api/farms/:id
// @desc    Delete a Farm
// @access  Private

router.delete("/:farm_id", auth, async (req, res) => {
    // Check if the user adding farm is a farmer
    const { id, userType } = req.user;
    if (userType !== "farmer")
        return res.status(401).json({
            errors: [{ msg: "User not authorized" }],
        });
    try {
        const farm = await Farm.findById(req.params.farm_id);

        if (!farm) {
            return res.status(404).json({ msg: "Farm not found" });
        }
        // Only the user who owns a farm can delete the post

        // Check User
        if (farm.owner.toString() !== id) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        await farm.remove();
        res.json({ msg: "Farm removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Farm not found" });
        }
        res.status(500).send("Server Error");
    }
});

// @route   PUT api/farms/:id
// @desc    Edit a Farm
// @access  Private

router.put("/:farm_id", auth, async (req, res) => {
    // Check if the user adding farm is a farmer
    const { id, userType } = req.user;
    if (userType !== "farmer")
        return res.status(401).json({
            errors: [{ msg: "User not authorized" }],
        });
    try {
        let farm = await Farm.findById(req.params.farm_id);

        if (!farm) {
            return res.status(404).json({ msg: "Farm not found" });
        }
        // Only the user who owns a farm can delete the post

        // Check User
        if (farm.owner.toString() !== id) {
            return res.status(401).json({ msg: "User not authorized" });
        }
        const { area, lat, long, address } = req.body;
        farm.area = area;
        farm.location = {
            lat,
            long,
        };
        farm.address = address;
        farm = await farm.save();
        res.json(farm);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Farm not found" });
        }
        res.status(500).send("Server Error");
    }
});
module.exports = router;
