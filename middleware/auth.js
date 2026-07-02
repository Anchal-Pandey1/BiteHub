const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.cookies.token;
    if (!token) 
        return res.send("Login required");

    try {
        const decoded = jwt.verify(token, "secretkey");
        req.user = decoded;
        next();
    } catch {
        res.send("Invalid token");
    }
}

module.exports = auth;