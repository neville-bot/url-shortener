// build post route to create new shortnened urls from user input
const express = require("express")
const forge = require("node-forge")
const validUrl = require("valid-url")
// express route handler
const router = express.Router()
// MD5 hasher instance
const md = forge.md.md5.create()
const baseUrl = "https://www.deft.com"

router.post("/:shorten", async (req, res) => {
  const { longUrl } = req.params.shorten
  // check if base API url is valid (for eventual deployment)
  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).json({ error: "Invalid URL" })
  }
  // generate random string (7 characters) MD5 hash, first seven letters + counter,
  // then run through base 62 conversion to get a short URL
  // counter is incremented by 1 each time a new url is created
  let shortUrl
  let sequence = 1

  // check if user inputted url is valid
  if (validUrl.isUri(longUrl)) {
    try {
      // check if url already exists in database
      const urlExists = await Url.findOne({ originalUrl: longUrl })
      if (urlExists) {
        shortUrl = await forge.md
          .update(longUrl + sequence)
          .then(() => {
            return forge.md.digest().toHex()
          })
          .then((hex) => {
            const bytes = forge.util.hexToBytes(hex)
            const encodedUrl = forge.util.encode64(bytes)
            if (encodedUrl.length > 7) {
              encodedUrl = encodedUrl.slice(0, 7)
            }
          })
      } else {
        shortUrl = await forge.md
          .update(longUrl + sequence)
          .then(() => {
            return forge.md.digest().toHex()
          })
          .then((hex) => {
            const bytes = forge.util.hexToBytes(hex)
            const encodedUrl = forge.util.encode64(bytes)
            if (encodedUrl.length > 7) {
              encodedUrl = encodedUrl.slice(0, 7)
            }
          })
      }
      // create new url object
      const newUrl = await Url.create({
        originalUrl: longUrl,
        shortUrl: baseUrl + "/" + shortUrl,
        userID: req.user.userID,
        createdAt: Date.now(),
        expirationDate: req.body.expirationDate,
      })
      // save in DB send response with newly created url
      await newUrl.save()
      res.status(201).json(newUrl)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } else {
    res.status(400).json({ error: "Invalid URL" })
  }
})

module.exports = router
