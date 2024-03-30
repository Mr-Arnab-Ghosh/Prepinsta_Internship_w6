const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    // food_items: Array,
    allergens: Array,
    food_group: String,
    description: String,
    ingredients: Array,
    serving_size: String,
    certifications: Array,
    food_item_name: String,
    health_benefits: Array,
    country_of_origin: String,
    preparation_methods: Array,
    dietary_restrictions: Array,
    brand_or_manufacturer: String,
    nutritional_information: Object,
    fat: Number,
    fiber: Number,
    protein: Number,
    calories: Number,
    carbohydrates: Number
})

const FoodDetails = new mongoose.model("FoodDetails",foodSchema)
module.exports= FoodDetails;