var user = require('./userSchema');
var questionsCollection = require('./questionSchema');
var quizSchema = require('./quizSchema');
var responseSchema = require('./responseSchema');
var validator = require('validator');

var Response = (function Response() {

	var that = Object.create(Response.prototype);

  /* Creates a new {Response} and stores it.
   * Executes a callback(err, newResponse) with err = null if it is succesful
   * @param {ObjectID} questionID
   * @param {String} contentText
   * @param {ObjectID} quizID
   * @param {ObjectID} userID
   * @param {Number} responseTime
   * @param callback {Function}
   */
  that.createFRResponse = function(questionID, contentText, quizID, userID,responseTime, callback) {
    sanitizedContentText = validator.escape(contentText)
    quizSchema.findOne({'_id':quizID}, function(err, quiz) {
      if (!err) {
        listOfQuestions = quiz.questions;
        quiz.questions.forEach(function(question) { //EXAMPLE OF FUNCTIONAL PROGRAMMING
          if (question.question.equals(questionID)) {
            question.hasSubmitted = true;
            question.responseTime = responseTime;
          }
        })
        quiz.save(function(err, savedQuiz) {
          if (!err) {
            responseSchema.create({
              'content' : sanitizedContentText,
              'question': questionID,
              'quizId' : quizID,
              'creator': userID,
              'responseTime': responseTime
            }, function(err, response) {
              if(!err) {
                questionsCollection.findById(questionID)
                .exec(function(err, question){
                  if(!err){
                    responseSchema.count({question: questionID})
                    .exec(function(err, count){
                      currentAverageResponseTime = question.averageResponseTime
                      numberOfResponses = count-1
                      previoustotalResponseTime = currentAverageResponseTime*numberOfResponses;
                      newTotalResponseTime = parseInt(previoustotalResponseTime) + parseInt(responseTime)
                      newAverageResponseTime = newTotalResponseTime/count
                      question.averageResponseTime = newAverageResponseTime;
                      question.save(function(err, savedQuestion){
                        if(!err){
                          callback(null, savedQuiz, response);
                        }
                        else{
                          callback("Error Saving Updated Question");
                        }
                      })
                    })
                  }
                  else{
                    callback("Error Finding Question");
                  }
                })
              } else {
                callback("New Response not created");
              }
            })
          } else {
            callback("Unable to update quiz");
          }
        })
      } else {
        callback("Unable to retrieve quiz");
      }
    })
  }

//Helper function that checks whether a user answered a MC question correctly.
  var gradeMCQ = function(question, choices){
    return !choices.some(function(choice, index){                   //EXAMPLE OF FUNCTIONAL PROGRAMMING
      var isSelected = (choice.isSelected === "true");
      return isSelected !== question.choices[index].isTrue
    });
  }

  /* Creates a new MC {Response} and stores it.
   * Executes a callback(err, newResponse) with err = null if it is succesful
   * @param questionID
   * @param choices
   * @param quizID
   * @param userID
    * @param responseTime
   * @param callback {Function}
   */

  that.createMCResponse = function(questionID, choices, quizID, userID, responseTime,callback) {
    sanitizedlistOfChoices = choices.map(function(choice){      //EXAMPLE OF FUNCTIONAL PROGRAMMING
      return {content: validator.escape(choice.content), isSelected: choice.isSelected}
    })
    quizSchema.findOne({'_id':quizID}, function(err, quiz) {
      if (!err) {
        listOfQuestions = quiz.questions;
        quiz.questions.forEach(function(question) {
          if (question.question.equals(questionID)) {
            question.hasSubmitted = true;
            question.responseTime = responseTime;
          }
        })
        quiz.save(function(err, savedQuiz) {
          if (!err) {
            responseSchema.create({
              'choices' : sanitizedlistOfChoices,
              'question': questionID,
              'quizId' : quizID,
              'creator': userID,
              'responseTime': responseTime
            }, function(err, response) {
              if(!err) {
                questionsCollection.findById(questionID)
                .exec(function(err, question){
                  if(!err){
                    response.isCorrect = gradeMCQ(question, choices)
                      response.save(function(err, response){
                        if(!err){
                          responseSchema.count({question: questionID})
                          .exec(function(err, count){
                            currentAverageResponseTime = question.averageResponseTime
                            numberOfResponses = count-1
                            previoustotalResponseTime = currentAverageResponseTime*numberOfResponses;
                            newTotalResponseTime = parseInt(previoustotalResponseTime) + parseInt(responseTime)
                            newAverageResponseTime = newTotalResponseTime/count
                            question.averageResponseTime = newAverageResponseTime;
                            question.save(function(err, savedQuestion){
                              if(!err){
                                callback(null, savedQuiz, response);
                              }
                              else{
                                callback("Error Saving Updated Question");
                              }
                            })
                          })
                        }
                        else{
                          callback("Error Updating Response")
                        }
                    })
                  }
                  else{
                    callback("Error Finding Question");
                  }
                })
              } else {
                callback("New MC Response not created");
              }
            })
          } else {
            callback("Unable to update quiz");
          }
        })
      } else {
        callback("Unable to retrieve quiz");
      }
    })
  }


  /* Gets a {Response} and returns it in the callback.
   * Executes a callback(err, response) with err = null if it is succesful
   * @param callback {Function}
   */
  that.getResponse = function(userID, callback) {
    responseSchema.find({choices:[], creator: {$ne: userID}})
    .populate('question', 'questionString solution')
    .exec( function(err, responseList) {
      if (err) {
        callback("Can't find a list of Free Response responses.");
      }
      else {
        response = Math.floor(Math.random() * responseList.length);
        callback(null, responseList[response])
      }
    }
  )
}
  Object.freeze(that);
  return that;
})();


module.exports = Response;