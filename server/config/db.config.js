const mongoose = require("mongoose")
const mongoUser = process.env.MONGODB_USER
const mongoPw = process.env.MONGODB_PW
const DB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://${mongoUser}:${mongoPw}@cluster0.ymsqu.mongodb.net/cluster0?retryWrites=true&w=majority`

mongoose.connect(DB_URI).catch((error) => console.error(error))

const connection = mongoose.connection

module.exports = connection
