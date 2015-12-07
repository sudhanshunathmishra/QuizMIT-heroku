var user = require('./userSchema');
var responseSchema = require('./responseSchema');
var feedbackSchema = require('./feedbackSchema');
var validator = require('validator');

var Feedback = (function Feedback() {

  var that = Object.create(Feedback.prototype);

   /* Gets an array of feedback timestamps and returns it in the callback.
   * Executes a callback(err, feedbackTimes) with err = null if it is succesful
   * @param callback {Function}
   * @param userID
   */

  that.getFeedbackTimestamps = function(userID, callback) {
    responseSchema.find({'creator': userID}, function(err, responses) {
      if (err) {
        callback("got an error")
      }
      else {

        var responseIDs = []
        responses.forEach (function(response) {
          responseIDs.push(response._id)
        })

        feedbackSchema.find({'response': {$in: responseIDs}}, function(err, feedback) {
          if (err) {
            callback("Got an error");
          }
          else {
            feedbackTimes = []
            feedback.forEach( function(feedback) {
              feedbackTimes.push(feedback._id.getTimestamp().toLocaleString('en-US'))
            })

            callback(null, feedbackTimes)

          }
        })
      }
    })
  }

   /* Creates a new {Feedback} and stores it.
   * Executes a callback(err, newFeedback) with err = null if it is succesful
   * @param {ObjectID} responseID
   * @param {String} contentText
   * @param {ObjectID} userID
   * @param {Boolean} isCorrect
   * @param callback {Function}
   */
  that.createFeedback = function(responseID, contentText, userID, isCorrect, callback) {
    sanitizedContentText = validator.escape(contentText)
    feedbackSchema.create({
      'content' : sanitizedContentText,
      'response': responseID,
      'creator' : userID
    },function(err, savedFeedback){
      if(!err){
        user.findById(userID)
            .exec(function(err, user){
              user.points += 5;
              user.save(function(err, savedUser){
                if (!err){
                  responseSchema.findById(responseID)
                    .exec(function(err, response){
                      if(!err){
                        response.isCorrect= isCorrect;
                        response.save(function(err, savedResponse){
                          if(!err){
                            callback(null, savedFeedback);
                          }
                          else{
                            callback("Error updating response")
                          }
                        })
                      }
                      else{
                        callback("Error finding response")
                      }
                    })
                }
                else{
                  callback("Unable to find user");
                }
              })
            })
      }
      else{
        callback({error: "Trouble Saving Feedback"});
      }
    });
  }


  Object.freeze(that);
  return that;

})();

module.exports = Feedback;
