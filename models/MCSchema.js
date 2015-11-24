var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//Stores the usernames in a collection

var MCSchema = new Schema({
  question: String, //the actual question being asked
  choices: [Object], // a choice will have content, an incorrect or correct state, and a selected or not selected status
  status: String,
  appropriate: Number,
  tag: [String],
  time: Number
});

module.exports = mongoose.model("MCSchema", MCSchema);
