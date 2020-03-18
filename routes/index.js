const router = require("express").Router();
const auth = require("./api/auth");
const login = require("./api/login");
const users = require("./api/users");

router.use("/api/auth", auth);
router.use("/api/login", login);
router.use("/api/users", users);
module.exports = router;
