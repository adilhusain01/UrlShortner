const URL = require("../models/urlModel");
const shortId = require("shortid")

//function to create a shortened URL
const createShortenedURL = async (req,res) => {
    const { originalURL } = req.body;

    //generate a short unique code
    const shortCode = shortId.generate();

    try {
        //check if the original url exists in the database

        let url = await URL.findOne({ originalURL });

        if(url){
            //if url already exists, return the existing shortened url
            res.json(url);
        }else {
            //if doesnnt exist, create a new doocument
            url = new URL({
                originalURL,
                shortCode
            })
        }

        //save the url document to database
        await url.save();

        //return the newly created url
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: "Server Error"});
    }
}

const redirectToOriginalURL = async (req, res) => {
    const { shortenedCode } = req.params;
    
    try {
        //find the URL document with the given code
        const url = await URL.findOne({ shortCode: shortenedCode });

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