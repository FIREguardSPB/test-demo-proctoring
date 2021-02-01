const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://FIREguard:**********@cluster0.hdd44.mongodb.net/<dbname>?retryWrites=true&w=majority", {
  useNewUrlParser: true
});

module.exports = mongoose.connection;
