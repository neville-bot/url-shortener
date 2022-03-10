const express = require("express")
const shortenerRouter = require("./server/API-routes/url.js")
const redirectRouter = require("./server/API-routes/redirect.js")
const app = express()
const PORT = process.env.PORT || 5000
require("dotenv").config()
// DB connection
const connection = require("./server/config/db.config.js")
connection.once("open", () => {
  console.log("MongoDB database connection established successfully")
})
connection.on("error", (err) => {
  console.log("MongoDB connection error:", err)
})

// middleware
app.use(express.json()) // parses incoming request with JSON payloads (based on body-parser)
app.use(express.urlencoded({ extended: false }))
app.use("/", redirectRouter)
app.use("/api/url", shortenerRouter)

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || "Internal server error.")
})

app.listen(PORT, () => console.log(`Server started, Listening on port ${PORT}`))

module.exports = app
