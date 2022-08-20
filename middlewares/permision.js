module.exports = (...roles) => (req, res, next) => {
    const role = req.user.data.rules
    if (!roles.includes(role)) {
        return res.status(405).json({
            status: "error",
            key: "PERMISION",
            message: "you dont have permision",
        });
    }
    return next();
};
