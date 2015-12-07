var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//Stores the usernames in a collection

var quizSchema = new Schema({
  questions: [{question: { type: Schema.Types.ObjectId, required: true, ref: 'questionSchema'},
                content: { type: String, default: ""},
                listOfSelectedChoiceIndices : {type: [Number], default: []},
  				responseTime: {type: Number, default: 0}, 
                hasSubmitted: {type: Boolean, default: false}}], //the actual question being asked
  user: {type: Schema.Types.ObjectId, required:true, ref: 'userSchema'}
});

module.exports = mongoose.model("quizSchema", quizSchema);
