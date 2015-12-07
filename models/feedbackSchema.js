var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
  content: String,
  response: { type: Schema.Types.ObjectId, ref: 'responseSchema'},
  creator: { type: Schema.Types.ObjectId, ref: 'userSchema'}
});

module.exports = mongoose.model("feedbackSchema", feedbackSchema);
