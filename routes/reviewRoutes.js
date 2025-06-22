const express=require("express");
const router=express.Router();
const wrapAsync=require("../utilities/wrapAsync.js");
const expressError=require("../utilities/expressError.js");
const Review=require("../models/review.js");
const {reviewSchema}=require("../schema.js");
const mongoose=require('mongoose');
const database="mongodb://127.0.0.1:27017/Windbnb";
const Listing=require("../models/listing.js");

const methodOverride=require('method-override');
router.use(methodOverride('_method'));

function validateReview(req, res, next)
{
    const {error}=reviewSchema.validate(req.body);
    if(error) 
    {
        let errMessage=error.details.map((el) => el.message).join(", ");
        throw new expressError("404", errMessage);
    }
    else next();
}

router.post("/:id", validateReview, wrapAsync(async (req, res) =>
{
    const {id}=req.params;
    const newReview=new Review(req.body.Review);
    await newReview.save();
    const listing=await Listing.findById(id);
    listing.reviews.push(newReview._id);
    await listing.save();
    const data=await Listing.find();
    req.flash("success5", "Review added successfully");
    res.redirect(`/listing/${id}/show`); 
}));

router.delete("/:reviewId/listing/:id", wrapAsync(async (req, res) =>
{
    const {id, reviewId}=req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews:reviewId}});
    req.flash("success4", "Review delected successfully");
    res.redirect(`/listing/${id}/show`);
}));

module.exports=router;