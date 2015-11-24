var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
  content: String, //the actual question being asked
  response: { type: Schema.Types.ObjectId, ref: 'responseSchema'}
  //tag: [String],
  //time: Number,
});

module.exports = mongoose.model("feedbackSchema", feedbackSchema);
