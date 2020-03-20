module.exports = function(req, res, next) {
    if (req.user.userType !== "admin")
        return res
            .status(401)
            .json({ errors: [{ msg: "Not Authorised to Access this area." }] });
    else next();
};
