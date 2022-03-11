const express = require("express")
const Url = require("../models/Urlmodel")
const router = express.Router()

router.get("/", (req, res) => {
  res.send(
    "Please enter a your shortened URL and you will be redirected to your full URL."
  )
})
router.get("/:url", async (req, res) => {
  const url = req.params.url
  try {
    const redirectUrl = await Url.findOne({ shortUrl: url })
    if (redirectUrl) {
      const ogUrl = redirectUrl.originalUrl
      res.send(`Your old URL is: ${ogUrl}`)
    } else {
      res
        .status(404)
        .send(
          "Please enter the 7 alphanumeric characters of your shortened URL."
        )
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
