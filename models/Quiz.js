var user = require('./userSchema');
var questionsCollection = require('./questionSchema');
var quizSchema = require('./quizSchema');
var validator = require('validator');

var Quiz = (function Quiz() {
	var that = Object.create(Quiz.prototype);
	  /* Creates a new {Quiz} based on a users input tags.
   * Executes a callback(err, listOfQuestions) with err = null if it is succesful
   * @param input_tags
   * @param userID
   * @param callback {Function}
   */

  that.createQuiz = function(inputTags, userID, callback) {
    sanitizedInputTags = inputTags.map(function(tag){       //EXAMPLE OF FUNCTIONAL PROGRAMMING
        return validator.escape(tag)
      });

    //check if inputTags contains only the empty sting, in which case return all questions
    if (sanitizedInputTags === undefined || sanitizedInputTags.length === 0 || sanitizedInputTags.length === 1 && sanitizedInputTags[0] === ''){
      questionsCollection.find({}, function(err, questions){
        if (err) {
          callback(err);
        } else {
          quiz = []
          questions.forEach(function(question) {
            quiz.push({
              'question': question._id
            });
          });
          quizSchema.create({'questions' : quiz, 'user': userID}, function(err, quizDoc) {
            if (!err) {
              quizDoc.populate('questions.question', 'questionString choices', function (err,listOfQuestions){
                if (err) {
                    callback("No Questions Found");
                }
                else{
                    user.findById(userID)
                    .exec(function(err, user){
                      if (user) {
                        user.points -= 2
                        user.save(function(err, savedUser){
                          if (!err){
                            callback(null, listOfQuestions, quizDoc);
                          }
                          else{
                            callback({pointTrouble: true})
                          }
                        })
                      } else {
                        callback({msg: "Unable to find user"});
                      }
                    })
                  }
                });
            } else {
              callback({msg: "Failed to Create Quiz"});
            }
          });
        }
      });

    } else {

      questionsCollection.find({'tags' : {$in: sanitizedInputTags}}, function(err, questions){
        if (err) {
          callback(err);
        } else {
          quiz = []
          questions.forEach(function(question) {
            quiz.push({
              'question': question._id
            });
          });
          quizSchema.create({'questions' : quiz, 'user': userID}, function(err, quizDoc) {
            if (!err) {
              quizDoc.populate('questions.question', 'questionString choices', function (err,listOfQuestions){
                if (err) {
                    callback("No Questions Found");
                }
                else{
                    user.findById(userID)
                    .exec(function(err, user){
                      if (user) {
                        user.points -= 2
                        user.save(function(err, savedUser){
                          if (!err){
                            callback(null, listOfQuestions, quizDoc);
                          }
                          else{
                            callback({pointTrouble: true})
                          }
                        })
                      } else {
                        callback({msg: "Unable to find user"});
                      }
                    })
                  }
                });
            } else {
              callback({msg: "Failed to Create Quiz"});
            }
          });

        }
      });
    }
  }

  /* Retrieves a quiz from the database.
   * Executes a callback(err, quiz) with err = null if it is succesful
   * @param quizID
   * @param indexToUpdate
   * @param newContentOfIndex
   * @param indexToUpdate
   * @param callback {Function}
   */

  that.retrieveQuiz = function(quizId, indexToUpdate, newContentOfIndex, listOfNewSelectedChoiceIndices, newTimeOfIndex, callback) {
    quizSchema.findOne({'_id': quizId})
    .populate('questions.question', 'questionString choices')
    .exec(function (err,quiz){
      if (err){
        callback("No Questions Found");
      } else{
        listOfQuestions = quiz.questions;
        indexedQuestionObject = listOfQuestions[indexToUpdate];
        indexedQuestionObject.responseTime = newTimeOfIndex;
        indexedQuestionObject.content = newContentOfIndex;
        indexedQuestionObject.listOfSelectedChoiceIndices = listOfNewSelectedChoiceIndices;
        quiz.save(function(err, savedQuiz) {
          if (!err) {
            callback(null, quiz);
          } else {
            callback("Quiz Update Failed");
          }
        });
      }
    });
  };

  /*
   * Helper method to test if a Quiz a submitted question
   */
  var isQuizNonEmpty = function(quiz){
    return quiz.questions.some(function(questionObject){
              return questionObject.hasSubmitted
            })
  }

  /* Retrieves a list of quiz IDS for quizzes a user took.
   * Executes a callback(err, quizIDArray) with err = null if it is succesful
   * @param {ObjectID} userID
   * @param callback {Function}
   */

  that.getQuizHistory= function(userID, callback) {
    quizSchema.find({'user': userID}, function(err, quizzes) {
      if (err) {
        callback({msg : "Failed to get quiz history"});
      } else if (quizzes.length === 0) {
        callback({msg : "No quizzes found"});
      } else {
        var quizIDArray = []
        quizzes.forEach( function(quiz){
          if (isQuizNonEmpty(quiz)){
            quizIDArray.push(quiz._id)
          }
        })
        console.log("Quiz ID Array" + quizIDArray)
        callback(null, quizIDArray);
      }
    });
  }

  /* Gets a an array of quiz timestamps and returns them in the callback.
 * Executes a callback(err, timesArray) with err = null if it is succesful
 * @param callback {Function}
 * @param userID
 */

  that.getUserQuiz = function(userID, callback) {
    quizSchema.find({'user': userID}, function(err, responseArray) {
      if (err) {
        callback("Got an error")
      }
      else {
        var timesArray = []
        responseArray.forEach( function(quiz) {
          timesArray.push(quiz._id.getTimestamp().toLocaleString('en-US'))
        })
        callback(null, timesArray)
      }
    })
  }


	Object.freeze(that);
    return that;


})();

module.exports = Quiz;
