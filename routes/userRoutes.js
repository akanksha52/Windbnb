const express=require("express");
const router=express.Router();
const wrapAsync=require("../utilities/wrapAsync.js");
const expressError=require("../utilities/expressError.js");
const User=require("../models/user.js");
const {userSchema}=require("../schema.js");
const mongoose=require('mongoose');
const database="mongodb://127.0.0.1:27017/Windbnb";
const passport=require("passport");
const LocalStrategy=require("passport-local");

const methodOverride=require('method-override');
const { route } = require("./listingRoutes.js");
router.use(methodOverride('_method'));

function validateUser(req, res, next)
{
    const {error}=userSchema.validate(req.body);
    if(error) 
    {
        let errMessage=error.details.map((el) => el.message).join(", ");
        throw new expressError("404", errMessage);
    }
    else next();
}

router.get("/signup", (req, res) =>
{
    res.render("listing/signup.ejs", {title: "signup"});
});

router.get("/check-email", wrapAsync(async (req, res) => 
{
    const {email} = req.query;
    const userCheck = await User.findOne({ email });
    if(userCheck) 
    {
        return res.json({ available: false });
    }
    res.json({ available: true });
}));

router.post("/signup", validateUser, wrapAsync(async (req, res, next) => 
{
    const {email, password} = req.body;
    const newUser = new User({ email, username: email });
    await User.register(newUser, password);
    res.redirect("/listing");
}));

router.get("/login", (req, res) =>
{
    res.render("listing/login.ejs", {title: "login"});
});

router.post('/login',
    passport.authenticate('local', { failureRedirect: "/login", failureFlash: true }),
    wrapAsync(async (req, res) => 
    {
        req.flash("success6", "Welcome Back!!");
        res.redirect("/listing");
    })
);

module.exports=router;