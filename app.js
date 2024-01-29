const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const urlRoutes = require("./src/routes/urlRoutes")

//instance of express
const app = express();
const PORT = 8000;

//middleware for the JSON format
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://adil:Nigar01@cluster0.vhsb2sa.mongodb.net/").then(() => {
    console.log("Connected to MongoDB");
})

app.use('/', urlRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})