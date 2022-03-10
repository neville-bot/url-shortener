const express = require("express")
const Url = require("../models/Urlmodel")
const router = express.Router()

router.get("/", async (req, res) => {
  const ogUrl = req.params.url

  try {
    const url = await Url.findOne({ originalUrl: ogUrl })
    if (url) {
      // res.redirect(url.shortUrl)
    } else {
      res.status(404).json({ error: "Invalid URL" })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
