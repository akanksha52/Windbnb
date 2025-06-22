const Joi = require('joi');

const listingSchema = Joi.object({
    Listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).required(),
        country: Joi.string().required(),
        location: Joi.string().required()
    }).required()
});

const reviewSchema=Joi.object({
    Review: Joi.object({
        message: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required(),
    }).required()
});

const userSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});


module.exports={listingSchema, reviewSchema, userSchema};
