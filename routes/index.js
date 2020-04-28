const router = require("express").Router();
const auth = require("./api/auth");
const login = require("./api/login");
const users = require("./api/users");
const farms = require("./api/farms");
const orders = require("./api/orders");
const auctions = require("./api/auctions");
router.use("/api/auth", auth);
router.use("/api/login", login);
router.use("/api/users", users);
router.use("/api/farms", farms);
router.use("/api/orders", orders);
router.use("/api/auctions", auctions);

module.exports = router;
