var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//Stores the usernames in a collection

var userSchema = new Schema({
  username: String,
  password: String,
  points: Number

});

module.exports = mongoose.model("userSchema", userSchema);
