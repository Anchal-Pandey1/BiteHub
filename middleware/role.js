function isAdmin(req, res, next) {
    if (req.user.role === "admin") {
        return next();
    }
    res.send("Admin only access");
}

module.exports = isAdmin;