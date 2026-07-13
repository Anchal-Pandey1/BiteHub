const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const currentUser = require("./middleware/currentUser");
const userRoute = require("./routes/user");
const connectDb = require("./config/db");
const adminRoute = require("./routes/admin");
const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/auth");
const isAdmin = require("./middleware/role");
const Food = require("./models/Food");
const cartRoute = require("./routes/cart");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use("/cart", cartRoute);
app.use("/", authRoutes);
app.use("/user", userRoute);
app.use("/admin", auth, isAdmin, adminRoute);
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

connectDb();


app.get("/add-food", async (req, res) => {

    await Food.create({
        name: "Paneer Pizza",
        price: 299,
        category: "Pizza",
        image: "pizza.jpg",
        description:"Cheesy Paneer Pizza"
    });

    res.send("Food Added");
});

app.get("/", (req, res) => {
    res.render("user/home", {
        user: null
    });
});

app.get("/drinks" ,(req,res) => {
    res.render("user/drinks");
});

app.get("/food", async (req, res) => {

    const foods = await Food.find();

    res.render("user/menu", { foods });
});
app.get('/login', (req, res) => {
    res.render('user/login');
});

app.get('/signup', (req, res) => {
    res.render('user/signup');
});

app.get("/admin", auth, isAdmin, (req, res) => {
    res.send("Welcome Admin Panel");
});

app.get("/", currentUser, (req, res) => {

    res.render("user/home", {
        user: req.user
    });

});

app.listen(2010,() => {
    console.log("server running");
})
