var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//Stores the usernames in a collection

var userSchema = new Schema({
  username: String,
  password: String,
  points: {type: Number, default: 20}

});

module.exports = mongoose.model("userSchema", userSchema);
