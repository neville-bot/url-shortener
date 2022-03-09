// build post route to create new shortnened urls from user input
const express = require("express")
const validUrl = require("valid-url")

// express route handler
const router = express.Router()

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body
  // check if url is valid
  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ error: "Invalid URL" })
  }
  // generate random string (7 characters) MD5 hash, first seven letters + counter,
  // then run through base 62 conversion to get a short URL
  // counter is incremented by 1 each time a new url is created
  const shortUrl = await generateShortUrl(longUrl)
})
