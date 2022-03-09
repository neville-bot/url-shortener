const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  userID: Number,
  name: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  loginDate: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("User", UserSchema)
