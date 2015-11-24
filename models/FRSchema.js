var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//Stores the usernames in a collection

var FRSchema = new Schema({
  question: String, //the actual question being asked
  status: Boolean,
  appropriate: Number,
  tag: [String],
  averageTime: Number
  //creator: { type: ObjectId, ref: 'userSchema'}
});

module.exports = mongoose.model("FRSchema", FRSchema);
