var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var responseSchema = new Schema({
  content: String, //the actual question being asked
  question: { type: Schema.Types.ObjectId, ref: 'FRSchema'}
  //tag: [String],
  //time: Number,
});

module.exports = mongoose.model("responseSchema", responseSchema);
