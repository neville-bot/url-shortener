const mongoose = require("mongoose")

const URLSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  userID: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
  },
})

module.exports = mongoose.model("Url", URLSchema)
