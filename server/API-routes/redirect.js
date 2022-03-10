const express = require("express")
const Url = require("../models/Urlmodel")
const router = express.Router()

router.get("/", (req, res) => {
  res.send(
    "Please enter a URL to shorten, or api/{your url} to redirect your shortened URL to the original."
  )
})
router.get("/:url", async (req, res) => {
  console.log("get eem redirect route")
  const url = req.params.url
  try {
    const originalUrl = await Url.findOne({ originalUrl: url })
    const redirectUrl = await Url.findOne({ shortUrl: url })
    if (originalUrl) {
      const shortUrl = originalUrl.shortUrl
      res.send(shortUrl)
    } else if (redirectUrl) {
      res.send("Successfully redirected to your URL")
    } else {
      res.status(404).send("Please enter the correct URL!")
    }
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
