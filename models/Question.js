var user = require('./userSchema');
var questionsCollection = require('./questionSchema');
var quizSchema = require('./quizSchema');
var responseSchema = require('./responseSchema');
var feedbackSchema = require('./feedbackSchema');
var bcrypt = require('bcrypt');
var validator = require('validator');

var Question = (function Question() {
	var that = Object.create(Question.prototype);

  /* Creates a new {MCQuestion} and stores it.
   * Executes a callback(err, newMCQuestion) with err = null if it is succesful
   * @param {String} questionText
   * @param {[Choice]} listOfChoices
   * @param {[String]} listOfTags
   * @param {ObjectID} userID
   * @param callback {Function}
   */
  that.createMCQuestion = function(questionText, listOfChoices, listOfTags, userID, callback) {
    //console.log("User MC ID is " + userID)
    sanitizedQuestionText = validator.escape(questionText)
    sanitizedlistOfChoices = listOfChoices.map(function(choice){      //EXAMPLE OF FUNCTIONAL PROGRAMMING
      return {content: validator.escape(choice.content), isTrue: choice.isTrue}
    })
    sanitizedlistOfTags = listOfTags.map(function(tag){     //EXAMPLE OF FUNCTIONAL PROGRAMMING
      return validator.escape(tag)
    })
    questionsCollection.count({'questionString':questionText}, function(err, count) {
      // console.log("error and count" + err + count)
      if (count === 0) { //the same question already isn't in the database
          console.log("User ID is " + userID)
          questionsCollection.create({
          'creator': userID,
          'questionString': questionText,
          'tags': sanitizedlistOfTags,
          'choices': sanitizedlistOfChoices
          }, function(err, newMCQuestion) {
              if (!err) {
                user.findById(userID)
                .exec(function(err, user){
                  user.points += 5
                  user.save(function(err, savedUser){
                    if (!err){
                      callback(null, newMCQuestion);
                    }
                    else{
                      callback({pointTrouble: true})
                    }
                  })
                })
              } else {
                callback({notCreated: true});
              };
          });
      }
      else{
        callback({taken: true})
      }
    });
  };

  /* Creates a new {FRQuestion} and stores it.
   * Executes a callback(err, newMCQuestion) with err = null if it is succesful
   * @param {String} questionText
   * @param {String} solution
   * @param {[String]} listOfTags
   * @param {ObjectID} userID
   * @param callback {Function}
   */
  that.createFRQuestion = function(questionText, listOfTags, userID, solution, callback) {
     sanitizedQuestionText = validator.escape(questionText)
     sanitizedlistOfTags = listOfTags.map(function(tag){       //EXAMPLE OF FUNCTIONAL PROGRAMMING
        return validator.escape(tag)
      });
     sanitizedSolution = validator.escape(solution)

    questionsCollection.count({'questionString':questionText}, function(err, count) {
      if (count === 0) { //the same question already isn't in the database
        questionsCollection.create({
          'creator': userID,
          'questionString': sanitizedQuestionText,
          'tags': sanitizedlistOfTags,
          'choices': [],
          'solution': sanitizedSolution
        }, function(err, newFRQuestion) {
          if (!err) {
            user.findById(userID)
                .exec(function(err, user){
                  user.points += 5
                  user.save(function(err, savedUser){
                    if (!err){
                      callback(null, newFRQuestion);
                    }
                    else{
                      callback({pointTrouble: true})
                    }
                  })
                })
          } else {
            callback({notCreated: true});
          };
      });
    }
    else{
        callback({taken: true})
      }
    });
  }
	Object.freeze(that);
  	return that;
})();


module.exports = Question;

