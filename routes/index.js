const router = require("express").Router();
const auth = require("./api/auth");
const login = require("./api/login");
const users = require("./api/users");
const farms = require("./api/farms");
const orders = require("./api/orders");
router.use("/api/auth", auth);
router.use("/api/login", login);
router.use("/api/users", users);
router.use("/api/farms", farms);
router.use("/api/orders", orders);

module.exports = router;
