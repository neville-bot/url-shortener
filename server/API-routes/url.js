// build post route to create new shortnened urls from user input
const express = require("express")
const Url = require("../models/Urlmodel")
const forge = require("node-forge")
const validator = require("validator")
// express route handler
const router = express.Router()
// MD5 hasher instance
const md = forge.md.md5.create()
const baseUrl = "localhost:5000"

router.get("/", (req, res) => {
  res.send(
    "Please enter a URL to be shortened, and it will be rendered on the page."
  )
})
router.post("/:url", async (req, res) => {
  const longUrl = req.params.url
  // check if base API url is valid (for eventual deployment)
  if (
    !validator.isURL(baseUrl, { require_protocol: false, require_tld: false })
  ) {
    return res
      .status(500)
      .json({ error: "Server error, base URL is not valid" })
  }
  // generate random string (7 characters) MD5 hash, first seven letters + counter,
  // then run through base 62 conversion to get a short URL
  // counter is incremented by 1 each time a new url is created
  let shortUrl
  let sequence = 1
  // check if user inputted url is valid
  if (validator.isURL(longUrl, { require_protocol: false })) {
    try {
      // check if url already exists in database
      const urlExists = await Url.findOne({ originalUrl: longUrl })
      if (urlExists) {
        shortUrl = md.update(longUrl + sequence)
        sequence++
      } else {
        shortUrl = md.update(longUrl)
      }
      const hex = md.digest().toHex()
      const bytes = forge.util.hexToBytes(hex)
      let encodedUrl = forge.util.encode64(bytes)
      if (encodedUrl.length > 7) {
        encodedUrl = encodedUrl.slice(0, 7)
      }
      // create new url object
      const newUrl = await Url.create({
        originalUrl: longUrl,
        shortUrl: encodedUrl,
        userID: 1,
        createdAt: Date.now(),
        expirationDate: req.body.expirationDate,
      })
      // save in DB send response with newly created url
      await newUrl.save()
      res.status(201).json(`Your new URL is: ${baseUrl}/${newUrl.shortUrl}`)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } else {
    res
      .status(400)
      .send(
        "Please enter properly formatted web address, i.e. tld.domain.subdomin, you entered: " +
          longUrl
      )
  }
})

module.exports = router
