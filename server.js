const express=require("express");
const app=express();
const path=require("path");
const port=8080;
const mongoose=require('mongoose');
const database="mongodb://127.0.0.1:27017/Windbnb"
const Listing=require("./models/listing.js");
const Review=require("./models/review.js");
const User=require("./models/user.js");
const methodOverride=require('method-override');
const wrapAsync=require("./utilities/wrapAsync.js");
const expressError=require("./utilities/expressError.js");
const {listingSchema, reviewSchema, userSchema}=require("./schema.js");
const engine=require("ejs-mate");
const listingRoutes=require("./routes/listingRoutes.js");
const reviewRoutes=require("./routes/reviewRoutes.js");
const userRoutes=require("./routes/userRoutes.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");


app.listen(port, () =>
{
    console.log(`Listening on port: ${port}`);
});


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('ejs', engine);
app.use(methodOverride('_method'));

app.use(session(
{
    secret: 'aaa',
    resave: false,
    saveUninitialized: true,
    cookie:
    {
        expires: Date.now()+1000*60*60*24*3,
        maxAge: 1000*60*60*24*3,
        httpOnly: true
    }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/demo", async (req, res) =>
{
    let fakeUser=new User(
    {
        username: "Ajay",
        email: "ajay@gmail.com"
    })
    let registeredUser=await User.register(fakeUser, "Ajay");
    res.send(registeredUser);
});

async function main() 
{
    await mongoose.connect(database);
};

main()
.then((res) =>
{
    console.log("Connection established with database Windbnb");
})
.catch((err) =>
{
    console.log("Failed to establish connection with database WindBnb");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/listing", listingRoutes);

app.use("/review", reviewRoutes);

app.use("/user", userRoutes);

app.use((req, res, next) => {
    next(new expressError(404, "Page does not exist"));
});

app.use((err, req, res, next) =>
{
    const {status=500, message="Unknown error occured"}=err;
    res.render("listing/error.ejs", {title: "Error", status, message});
});