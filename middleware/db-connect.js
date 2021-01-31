const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://FIREguard:Ant_260671520032@cluster0.hdd44.mongodb.net/<dbname>?retryWrites=true&w=majority", {
  useNewUrlParser: true
});

module.exports = mongoose.connection;
