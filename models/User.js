var user = require('./userSchema');
var FRSchema = require('./FRSchema');
var MCSchema = require('./MCSchema');
var responseSchema = require('./responseSchema');
var feedbackSchema = require('./feedbackSchema');
var bcrypt = require('bcrypt');


var User = (function User() {

  var that = Object.create(User.prototype);


  //Private method that checks if a user exists with the given username in our Mongoose userCollection
  var doesUserExist = function(username, callback) {
    user.findOne({'username': username})
    .exec(function (err,user){
      if (!user){
        callback("No User Found");  
      }
      else{
        callback(null, user);
      }
    });
  }

  /**
   * Calls the callback with the user if one exists with the given username.
   * @param {String} username, is the username to look up a user by.
   * @param {function} callback, the function to be called at the end with either the error or the user.
   */
  that.findByUsername = function (username, callback) {
    doesUserExist(username, function(err, user) {
      if (!err) {
        callback(null, user);
      } else {
        callback({ msg : 'No such User!' });
      }
    });
  }

  /**
   * Checks if the password being entered is the one that the user registered with.
   * @param {String} username, is the username of the user in question.
   * @param {String} candidatepw, is the password to match with previously stored password.
   * @param {function} callback, the function to be called at the end with the boolean 
   * stating whether the passwords matched or not.
   */
  that.verifyPassword = function(username, candidatepw, callback) {
    doesUserExist(username, function(err, user) {
      if (!err) {
        bcrypt.compare(candidatepw, user.password, function(err, res) {
          if (!err) {
            callback(null, true);
          } else {
            callback(null, false);
          }    
        })
      } else {
        callback(null, false);
      }
    });
  }

  /* Creates a new {User} and stores it. Executes a callback(err) with err = null if it is succesful
   * @param username
   * @param password
   * @param callback {Function}
   */
  that.createNewUser = function(username, password, callback) {
    console.log("USER.CREATENEWUSER");
    doesUserExist(username, function(err, result) {
      if (result){
        console.log("USER EXISTS");
        callback({ taken: true });
      } else {

        console.log("USER DOES NOT EXIST");
        user.create({ 
          'username' : username,
          'password' : password
        }, function(err, user) {
          console.log(err);
          console.log(user);
          if (!err) {
            console.log("USER CREATED");
            callback(null);
          } else {
            console.log("FAILED TO CREATE");
            callback({msg: "Failed to Create User"});
          }
        });
      }
    });
  }




  // that.createMCQuestion = function(question, choices, tag, callback) {
  //   //Create Choice objects from whatever is passed in to choices

  //   MCSchema.count({'question':question}, function(err, count) {

  //     if (count === 0) { //the same question already isn't in the database

  //       var newFRQuestion = new 
  //       FRQuestion.create({
  //         question: question,
  //         choices: choices,
  //         status: true,
  //         appropriate: 0,
  //         tag: tag
  //         });
  //       callback(null);
  //     }
  //     else {
  //       callback({taken:true})
  //     }
  //   });
  // };



  that.createFRQuestion = function(questionText, tag, callback) {

    FRSchema.count({'question':questionText}, function(err, count) {
      if (count === 0) { //the same question already isn't in the database
        var newFRQuestion = new FRSchema({
                                          'question'    : questionText,
                                          'status'      : true,
                                          'appropriate' : 0,
                                          'tag'         : [],
                                          'averageTime' : 0
                                        });
        newFRQuestion.save();
        callback(null, newFRQuestion);
      } else {
        callback({taken:true})
      }
    });
  }

  that.createResponse = function(questionID, contentText, callback) {

    var newResponse = new responseSchema({
      'content' : contentText,
      'question': questionID
    });

    newResponse.save();
    callback(null, newResponse);

  }

  that.getResponse = function(callback) {
    responseSchema.findOne({})
    .populate('question', 'question')
    .exec(function (err,response){
      if (err){
        callback("No Response Found");  
      }
      else{
        console.log(response.question);
        callback(null, response);
      }
    });
  }

  that.createFeedback = function(responseID, contentText, callback) {

    var newFeedback = new feedbackSchema({
      'content' : contentText,
      'response': responseID
    });

    newFeedback.save();
    callback(null, newFeedback);

  }


  that.createQuiz = function(input_tags, callback) {

    FRSchema.find({}, function(err, questions){
      if (err) {
        callback(err);
      } else {
        callback(null, questions);
      }
    });
  }


  Object.freeze(that);
  return that;

})();

module.exports = User;

