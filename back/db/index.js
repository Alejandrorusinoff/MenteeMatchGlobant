// Mongoose connection
const mongoose = require("mongoose")
const uri =
  "mongodb+srv://admin:menteematch@cluster-db.sr3ho.mongodb.net/menteematch?retryWrites=true&w=majority"
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: false
})

module.exports = mongoose
