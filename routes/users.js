var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var Feedback = require('../models/Feedback.js')
var utils = require('../utils/utils');
var bcrypt = require('bcrypt');
var Quiz = require('../models/Quiz.js')

/*
  For both login and create user, we want to send an error code if the user
  is logged in, or if the client did not provide a username and password
  This function returns true if an error code was sent; the caller should return
  immediately in this case.
*/
var isLoggedInOrInvalidBody = function(req, res) {
  if (req.currentUser) {
    utils.sendErrResponse(res, 403, 'There is already a user logged in.');
    return true;
  } else if (!(req.body.username && req.body.password)) {
    utils.sendErrResponse(res, 400, 'Username or password not provided.');
    return true;
  }
  return false;
};

/*
  This function will check to see that the provided username-password combination
  is valid. For empty username or password, or if the combination is not correct,
  an error will be returned.
  An user already logged in is not allowed to call the login API again; an attempt
  to do so will result in an error code 403.
  POST /users/login
  Request body:
    - username
    - password
  Response:
    - success: true if login succeeded; false otherwise
    - content: on success, an object with a single field 'user', the object of the logged in user
    - err: on error, an error message
*/
router.post('/login', function(req, res) {
  if (isLoggedInOrInvalidBody(req, res)) {
    return;
  }
  User.verifyPassword(req.body.username, req.body.password, function(err, match) {
    if (match) {
      req.session.username = req.body.username;
      utils.sendSuccessResponse(res, { user : req.body.username });
    } else {
      utils.sendErrResponse(res, 403, 'Username or password invalid.');
    }
  });
});

/*
  POST /users/logout
  Request body: empty
  Response:
    - success: true if logout succeeded; false otherwise
    - err: on error, an error message
*/
router.post('/logout', function(req, res) {
  if (req.currentUser) {
    req.session.destroy();
    utils.sendSuccessResponse(res);
  } else {
    utils.sendErrResponse(res, 403, 'There is no user currently logged in.');
  }
});

/*
  Create a new user in the system.
  All usernames in the system must be distinct. If a request arrives with a username that
  already exists, the response will be an error.
  This route may only be called accessed without an existing user logged in. If an existing user
  is already logged in, it will result in an error code 403.
  Does NOT automatically log in the user.
  POST /users
  Request body:
    - username
    - password
  Response:
    - success: true if user creation succeeded; false otherwise
    - err: on error, an error message
*/
router.post('/', function(req, res) {
  if (isLoggedInOrInvalidBody(req, res)) {
    return;
  }

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      User.createNewUser(req.body.username, hash,
        function(err) {
          if (err) {
            if (err.taken) {
              utils.sendErrResponse(res, 400, 'That username is already taken!');
            } else {
              utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
            }
          } else {
            utils.sendSuccessResponse(res, req.body.username);
          }
      });
        // Store hash in your password DB.
    });
  });
});

/*
  Determine whether there is a current user logged in
  GET /users/current
  No request parameters
  Response:
    - success.loggedIn: true if there is a user logged in; false otherwise
    - success.user: if success.loggedIn, the currently logged in user
*/
router.get('/current', function(req, res) {
  if (req.currentUser) {
    utils.sendSuccessResponse(res, { loggedIn : true, user : req.currentUser.username });
  } else {
    utils.sendSuccessResponse(res, { loggedIn : false });
  }
});

/*
  Get the newsfeed.
  GET /users/newsfeed
  No request parameters
  Response:
    - success; got all the required data for the newsfeed, false otherwise
    - success.user.username -
    -points
    -responseArray: array of quiz times
    -feedbackTimes: array of feedback times
*/



router.get('/newsfeed', function(req, res) {
  if (req.currentUser) {
    User.findByUsername(req.currentUser.username,
      function(err, user) {
        if (user) {
          Quiz.getUserQuiz(req.currentUser._id,
            function(err, responseArray) {
              if (err) {
                utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
              }
              else {
                Feedback.getFeedbackTimestamps(req.currentUser._id,
                function(err, feedbackTimes) {
                  if (err) {
                    utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
                  }
                  else {
                    utils.sendSuccessResponse(res, {user : user.username, points: user.points, responseArray: responseArray, feedbackTimes: feedbackTimes});
                  }
                })
              }
            })
        } else {
          utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
        }
      });
  } else {
    utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
  }
});

/*
  Create a new user.
  GET /users/register
  No request parameters
  Response:
    - success; created user, false otherwise
    - success.user- user
*/


router.post('/register', function(req, res, next){
    if (isLoggedInOrInvalidBody(req, res)){
        return;
    }

    User.createNewUser(req.body.username, req.body.password,
        function(err, user) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(400).send(user);
            }
      });

});

module.exports = router;
