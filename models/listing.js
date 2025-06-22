//Scjema for listings
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const model=mongoose.model;
const Review=require("./review.js");

const listSchema=new schema(
{
    title: 
    {
        type: String,
        default: "Place"
    },
    description: 
    {
        type: String,
        default: "Amazing travel spot!!"
    },
    image: 
    {
        filename:
        {
            type: String
        },
        url:
        {
            type: String,
            default: "/images/default.jpg",
            set: (v) =>
            {
                return (!v || v.trim()==="") ? "/images/default.jpg" : v;
            }
        }
    },
    price:  
    {
        type: Number,
        default: 0
    },
    location:  
    {
        type: String,
        default: "India"
    },
    country: 
    {
        type: String,
        default: "India"
    },
    reviews: 
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
});

listSchema.post('findOneAndDelete', 
async function (doc) 
{
    if(doc) 
    {
        await Review.deleteMany(
        {
            _id: { $in: doc.reviews }
        });
    }
});

const Listing=model("Listing", listSchema);

module.exports=Listing;