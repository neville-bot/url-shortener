const mongoose = require("mongoose")

const URLSchema = new mongoose.Schema({
  _id: "hashed",
  originalUrl: String,
  shortUrl: String,
  userID: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
    optional: true,
  },
})

module.exports = mongoose.model("Url", URLSchema)
