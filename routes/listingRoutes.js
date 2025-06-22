const express=require("express");
const router=express.Router();
const wrapAsync=require("../utilities/wrapAsync.js");
const expressError=require("../utilities/expressError.js");
const Listing=require("../models/listing.js");
const {listingSchema}=require("../schema.js");
const mongoose=require('mongoose');
const database="mongodb://127.0.0.1:27017/Windbnb";

const methodOverride=require('method-override');
router.use(methodOverride('_method'));

function validateListing(req, res, next)
{
    const {error}=listingSchema.validate(req.body);
    if(error) 
    {
        let errMessage=error.details.map((el) => el.message).join(", ");
        throw new expressError("404", errMessage);
    }
    else next();
};

router.get("/", wrapAsync( async (req, res, next) => 
{
    const data=await Listing.find();
    const x=req.flash("success");
    const success=x[0];
    const y=req.flash("success2");
    const success2=y[0];
    const z=req.flash("success3");
    const success3=z[0];
    const w=req.flash("success6");
    const success6=w[0];
    res.render("listing/home.ejs", {title: "Home | Windbnd", data, success, success2, success3, success6});
}));

router.get('/:id/show', wrapAsync(async (req, res) => 
{
    const {id}=req.params;
    const data=await Listing.findById(id).populate('reviews');
    if(!data) return res.status(404).send("Listing not found");
    const x=req.flash("success4");
    const success4=x[0];
    const y=req.flash("success5");
    const success5=y[0];
    res.render("listing/show.ejs", {title: `${data.title}`, data, success4, success5});
}));

router.get("/new", (req, res) =>
{
    res.render("listing/new.ejs", {title: "New Location"});
});

router.post("/new", validateListing, wrapAsync(async (req, res) =>
{
    const newListing=new Listing(req.body.Listing);
    await newListing.save();
    req.flash("success", "Listing added successfully");
    res.redirect("/listing");
}));

router.delete("/:id/delete", wrapAsync(async (req, res) =>
{
    const {id}=req.params;
    await Listing.findOneAndDelete({_id: id}) ;
    req.flash("success3", "Listing deleted successfully");
    res.redirect("/listing");
}));

router.get("/:id/edit", wrapAsync(async (req, res) =>
{
    const {id}=req.params;
    const chat=await Listing.findById(id);
    res.render("listing/edit.ejs", {title: "Edit | chat.title", chat});
}));

router.patch("/:id/edit", validateListing, wrapAsync(async (req, res) =>
{
    const {id}=req.params;
    const newListing=new Listing(req.body.Listing);
    await Listing.findByIdAndUpdate(id, req.body.Listing, { runValidators: true });
    req.flash("success2", "Listing updated successfully");
    res.redirect("/listing");
}));

module.exports=router;