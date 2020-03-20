const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route   POST api/login
// @desc    Authenticate the user and return token
// @access  Public

router.post(
    "/",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Password is required")
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "No such user exists" }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: "Password do not Match. Try Again." }]
                });
            }

            const { id, userType } = user;
            const payload = {
                user: {
                    id,
                    userType
                }
            };
            jwt.sign(
                payload,
                config.get("jwtSecretKey"),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    return res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server Error");
        }
    }
);
module.exports = router;
