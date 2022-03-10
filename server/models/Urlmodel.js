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
    optional: true,
  },
})

/*
dummy data = [
  {
    originalUrl: "https://www.google.com",
    shortUrl: "https://www.deft.com/HVkg9LR",
    userID: 1,
  },
  {
    originalUrl: "https://www.facebook.com",
    shortUrl: "https://www.deft.com/I0PseKB",
    userID: 1,
  },
  {
    originalUrl: "https://www.youtube.com",
    shortUrl: "https://www.deft.com/MQgUbXL",
    userID: 1,
  }
]
*/
module.exports = mongoose.model("Url", URLSchema)
