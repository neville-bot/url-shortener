const mongoose = require("mongoose")
const mongoUser = process.env.MONGODB_USER
const mongoPw = process.env.MONGODB_PW
const DB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://${mongoUser}:${mongoPw}@cluster0.ymsqu.mongodb.net/cluster0?retryWrites=true&w=majority`

mongoose.connect(DB_URI).catch((error) => console.error(error))
const connection = mongoose.connection

// async function main() {
//   const collection = connection.collection("Urls")
//   const deleteResult = await collection.deleteMany({
//     expirationDate: expirationDate - new Date(Date.now()) < 0,
//   })
//   console.log(deleteResult.result.n + " documents deleted.")
// }
// main().catch(console.error)

module.exports = connection
