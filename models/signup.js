const bcrypt = require("bcrypt");
const User = require("./models/User");

app.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || "user"   // 👈 admin/user decide here
    });

    await user.save();

    res.send("User created");
});