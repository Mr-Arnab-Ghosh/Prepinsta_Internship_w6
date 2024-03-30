const express = require('express');
const app = express();
const port = 4200;

const FoodDetails = require('./models/foodData');
require('./db/conn');

app.use(express.json()); // Middleware for parsing JSON bodies

// Get all food items from the database
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Food API Creation</h1>')
})

app.post('/food', async(req, res) => {    // CREATE Operation
    try {
        const insertFoodData = await  FoodDetails.create(req.body);   // we can also use "save()" method but it would not accept multiple objects or array
        console.log(`New food item added: ${insertFoodData}`);
        if (!insertFoodData) return res.status(500).send("Error creating new food item");
        res.status(200).send({ msg: "Successfully created new food item", InsertedData: insertFoodData});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})



app.get('/getFoodData', async(req, res) => {    // READ Operation
    try {
        const getAllFoods = await FoodDetails.find();
        res.json(getAllFoods);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


app.get('/getFoodData/:food_item_name', async(req, res) => {     // READ Operation     // read all food details with parameter
    const re_foodName = req.params.food_item_name;
    try {
        const foodItem = await FoodDetails.findOne({food_item_name:re_foodName});     // we've also methods like "findById()" if we want to pass "_id"
        if(!foodItem) return res.status(404).send("No food item found with this ID!");
        res.json(foodItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})



app.put("/updateFoodData/:food_group", async (req, res) => {   // UPDATE Operation     // update using "put()" method through parameter means if it matches we will update all fields
    const up_foodGroup = req.params.food_group;
    try {
        const updatefoodData = await FoodDetails.updateOne({food_group: up_foodGroup}, {$set: req.body})   // we can also use "findOneAndUpdate()" method
        if (updatefoodData.n == 0) {
            res.status(404).send("No food with this ID was found.");
        } else {
            res.status(200).send("The food data has been updated.")
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})


app.patch("/editFoodData/:country_of_origin", async (req, res) => {    // UPDATE Operation     // update using "patch()" method through parameter means if it matches we will update particular field
    const up_coo = req.params.country_of_origin;
    try {
        const editfoodData = await FoodDetails.findOneAndUpdate({ country_of_origin: up_coo },{$set:{nutritional_information:{fat:13}}});   // without "$set:{}" operator it would also work
        if (editfoodData.n == 0) {
            return res.status(404).send("No food data available for this query.");
        } else {
            return res.status(200).send("The food data has been edited.");
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }    
})



// Delete a specific food from the database by its 'id'
app.delete("/deleteFoodData/:brand_or_manufacturer", async (req, res) => {    // DELETE Operation
    const del_bom = req.params.brand_or_manufacturer;   // Allergens is an array of strings so we need to select one element at
    try {
        const deleteFoodData = await FoodDetails.deleteOne({brand_or_manufacturer: del_bom});   // we can also use "findOneAndDelete()" method
        // res.status(200).send(deleteFoodData)
        if (deleteFoodData.n == 0) {
            res.status(404).send("No food with this ID was found.");
        } else {
            res.status(200).send("The food has been deleted.")
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});



// app.listen(port, () =>  async (console.log(`Server started on port ${port}`)));

app.listen(port, ()=> {
    console.log(`Server is listening at ${port}`);
    console.log('Server is running on http://localhost:' + port);
});