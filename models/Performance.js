var user = require('./userSchema');
var responseSchema = require('./responseSchema');
var feedbackSchema = require('./feedbackSchema');
var validator = require('validator');

var Performance = (function Performance() {

  var that = Object.create(Performance.prototype);

  	/* Retrieves a list of performance objects to displayed on performance page.
   * Executes a callback(err, performanceObjects) with err = null if it is succesful
   * @param {ObjectID} userID
   * @param callback {Function}
   */
  that.getPerformance = function(quizID, callback) {
    responseSchema.find({'quizId' : quizID})
    .populate('question','questionString choices averageResponseTime solution')
    .exec(function(err, responses) {
      var performanceObjects = [];
        if (!err) {
          responses.forEach(function(response, index) {
            var performance = {};
            feedbackSchema.findOne({'response':response._id})
            .exec(function(err, feedback) {

                //Properties common to both FR and MC

                var relativeSpeed = undefined;
                //Check whether response speed is faster or slower than average
                if (response.responseTime < response.question.averageResponseTime){
                  relativeSpeed = 'Fast';
                } else if (response.responseTime === response.question.averageResponseTime) {
                  relativeSpeed = 'Average';
                } else {
                  relativeSpeed = 'Slow';
                }

                performance["responseContent"] = response.content;
                performance["question"] = response.question.questionString;
                performance["relativeSpeed"] = relativeSpeed;
                performance["averageResponseTime"] = response.question.averageResponseTime;
                performance["responseTime"] = response.responseTime;


                //FR QUESTIONS------------------------------------
                if (feedback || response.question.choices.length === 0) {

                  performance["choices"] = undefined;
                  performance["numChoices"] = undefined;
                  performance["solution"] = response.question.solution;

                  //FR QUESTIONS WITH FEEDBACK
                  if (feedback) {
                    performance["feedback"] = feedback.content;
                    performance["score"] = undefined;//TODO change to correctness of FR
                  //FR QUESIONTS WITHOUT FEEDBACK
                  } else {
                    performance["feedback"] = undefined;
                    performance["score"] = undefined;
                  }


                //MC QUESTIONS------------------------------------

                } else {
                  if (err) {
                    {msg : "Failed to find feedback"}
                  } else {

                    var choicesCorrectness = response.question.choices;
                    var choicesSelections = response.choices;
                    var newChoices = [];
                    var score = 0;

                    choicesCorrectness.forEach(function(choice, i) {
                      //making new object for handlebars
                      var newChoice = {};
                      newChoice["content"] = choice.content;
                      newChoice["isTrue"] = choice.isTrue;
                      newChoice["isSelected"] = choicesSelections[i].isSelected;
                      newChoices.push(newChoice);

                      //counting correct questions
                      if (choice.isTrue === choicesSelections[i].isSelected) {
                        score += 1;
                      }
                    });

                    performance["feedback"] = null;
                    performance["choices"] = newChoices;
                    performance["score"] = score;
                    performance["numChoices"] = newChoices.length;
                    performance["solution"] = undefined;

                  }
                }

                performanceObjects.push(performance);
                if (index == responses.length - 1) {
                  callback(null, performanceObjects);
                }
            });
          });
        } else {
          callback({msg : "Failed to find matching responses"});
        }
    })
  }

  /* Retrieves a list of best and worst tags for a user.
   * Executes a callback(err, topics) with err = null if it is succesful
   * @param {ObjectID} userID
   * @param callback {Function}
   */
  that.getTopAndBottomTopics = function(userID, callback) {

    testTop = ["Best", "Second Best", "Third Best", "Fourth Best", "Fifth Best"];
    testBottom = ["Worst", "Second Worst", "Third Worst", "Fourth Worst", "Fifth Worst"];
    testObject = {};
    testObject.top = testTop;
    testObject.bottom = testBottom;
    callback(null, testObject)
  }
    Object.freeze(that);
  	return that;
	})();

module.exports = Performance;
