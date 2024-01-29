const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    originalURL:{
        type: String,
        required: true
    },
    shortenedCode:{
        type: String,
        required:true,
        unique: true
    },
    timeStamp:{
        type: Date,
        default: Date.now,
        required: true
    }
})

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;