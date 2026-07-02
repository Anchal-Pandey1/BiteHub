router.post("/login", async (req, res) => {
    const { email, password } = req.body;

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