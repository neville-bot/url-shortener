const express = require("express")
const Url = require("../models/Urlmodel")
const router = express.Router()

router.get("/:shortUrl", async (req, res) => {
  const shortUrl = req.params.shortUrl
  try {
    const url = await Url.findOne({ shortUrl: shortUrl })
    if (url) {
      res.redirect(url.originalUrl)
    } else {
      res.status(404).json({ error: "Invalid URL" })
    }
  } catch {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
