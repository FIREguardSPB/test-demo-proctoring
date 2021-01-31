const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    result: Object
});

module.exports = mongoose.model('User', userSchema);
