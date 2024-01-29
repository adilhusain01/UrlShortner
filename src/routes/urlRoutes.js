const express = require("express");
const router = express.Router();

const urlController = require("../controllers/urlController");

router.post('/url', urlController.createShortenedURL);
router.get('/url/:shortenedCode', urlController.redirectToOriginalURL);

module.exports = router;