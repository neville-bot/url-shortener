const express = require("express")
const shortenerRouter = require("./server/API-routes/url.js")
const redirectRouter = require("./server/API-routes/redirect.js")
const app = express()
const PORT = process.env.PORT || 5000

// middleware
app.use(express.json()) // parses incoming request with JSON payloads (based on body-parser)
app.use(express.urlencoded({ extended: false }))
app.use("/", shortenerRouter)
// app.use("/testAPI", redirectRouter)

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || "Internal server error.")
})

app.listen(PORT, () => console.log(`Server started, Listening on port ${PORT}`))

module.exports = app
