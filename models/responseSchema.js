var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var responseSchema = new Schema({
  content: String,
  choices: [{choiceContent: String, isSelected: Boolean}],
  question: { type: Schema.Types.ObjectId, required: true, ref: 'questionSchema'},
  responseTime: {type: Number, required: true},
  creator: { type: Schema.Types.ObjectId, ref: 'userSchema'},
  quizId: {type: Schema.Types.ObjectId, required: true, ref: 'quizSchema'},
  isCorrect: {type: Boolean, default: null}
});


module.exports = mongoose.model("responseSchema", responseSchema);
