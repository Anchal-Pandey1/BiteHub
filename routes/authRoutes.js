const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || "user"
    });

    await user.save();
    res.send("User created");
});

router.post("/login", async (req, res) => {
    console.log(req.body); 

    const { email, password } = req.body;

    console.log(email, password);

    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send("Wrong password");

    const token = jwt.sign(
        { id: user._id, role: user.role },
        "secretkey"
    );

    res.cookie("token", token);
    if (user.role === "admin") {
        return res.redirect("/admin/dashboard");
    }

    return res.redirect("/");

});

module.exports = router;
