var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var questionSchema = new Schema({
	creator: { type: Schema.Types.ObjectId, ref: 'userSchema'},
	questionString: {type: String, required: true},
	tags: [String],
	averageResponseTime: {type:Number,default:0},
	choices: [{content: String, isTrue: Boolean}],
	solution: String
});

module.exports = mongoose.model("questionSchema", questionSchema);
