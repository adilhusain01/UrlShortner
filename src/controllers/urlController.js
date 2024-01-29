const URL = require("../models/urlModel");
const shortId = require("shortid")

//function to create a shortened URL
const createShortenedURL = async (req,res) => {
    const { originalURL } = req.body;

    //generate a short unique code
    const shortCode = shortId.generate();

    try {
        // Create a new URL document with the generated short code
        const url = new URL({
            originalURL,
            shortenedCode: shortCode
        });

        // Save the new URL document to the database
        await url.save();

        // Return the newly created shortened URL
        res.json(url);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: "Server Error"});
    }
}

const redirectToOriginalURL = async (req, res) => {
    const { shortenedCode } = req.params;
    
    try {
        //find the URL document with the given code
        const url = await URL.findOne({ shortenedCode });

        if(url){
            res.redirect(url.originalURL);
        }else {
            //If url document not found
            res.status(404).json({message:"URL not found"});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: error.message});
    }
}

module.exports = {redirectToOriginalURL, createShortenedURL};