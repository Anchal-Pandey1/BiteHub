const jwt = require("jsonwebtoken");

function currentUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        req.user = jwt.verify(token, "secretkey");
    } catch (err) {
        req.user = null;
    }

    next();
}

module.exports = currentUser;