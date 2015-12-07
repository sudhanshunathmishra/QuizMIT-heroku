var user = require('./userSchema');
var bcrypt = require('bcrypt');
var validator = require('validator');

var User = (function User() {

  var that = Object.create(User.prototype);

  //Private method that checks if a user exists with the given username in our Mongoose userCollection
  var doesUserExist = function(username, callback) {
    sanitizedUsername = validator.escape(username);
    user.findOne({'username': sanitizedUsername})
    .exec(function (err,user){
      if (!user){
        callback("No User Found");
      }else{
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
   * @param {String} username
   * @param {String} password
   * @param callback {Function}
   */
  that.createNewUser = function(username, password, callback) {
    sanitizedUsername = validator.escape(username);
    sanitizedPassword = validator.escape(password);
    doesUserExist(username, function(err, result) {
      if (result){
        callback({ taken: true });
      } else {
        user.create({
          'username' : sanitizedUsername,
          'password' : sanitizedPassword
        }, function(err, user) {
          if (!err) {
            callback(null, user);
          } else {
            callback({msg: "Failed to Create User"});
          }
        });
      }
    });
  }

  Object.freeze(that);
  return that;

})();

module.exports = User;
