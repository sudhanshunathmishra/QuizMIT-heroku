var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var User = require('../models/User')
var Feedback = require('../models/Feedback.js')
var Quiz = require('../models/Quiz.js')
var Performance = require('../models/Performance.js')

/*
  Require authentication on ALL access to /performance/*
  Clients which are not logged in will receive a 403 error code.
*/
var requireAuthentication = function(req, res, next) {
  if (!req.currentUser) {
    utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
  } else {
    next();
  }
};

// Register the middleware handlers above.
router.all('*', requireAuthentication);


/*
  This function will get a list of quiz IDS.
  Request body:
    -currentUser
  Response:
    - success: true if got array of quiz IDs.
    - content: on success, a list of quiz IDs
    - err: on error, an error message
*/

router.get('/history', function(req, res){
    Quiz.getQuizHistory(req.currentUser._id, function(err, quizzes) {
        if (err) {
            utils.sendErrResponse(res, 500, "An unknown error occured");
        } else {
            utils.sendSuccessResponse(res, {listOfQuizzes : quizzes});
        }
    });
});

/*
  This function will get a performance Object to display on the performance page.
  Request body:
    - quizID
  Response:
    - success: true if got performanceObject, false otherwise
    - content: on success, a list of performance objects.
    - err: on error, an error message
*/
router.get('/quiz', function(req, res){
    Performance.getPerformance(req.query.quizID, function(err, performanceObjects) {
        if (err) {
            utils.sendErrResponse(res, 500, "An unknown error occured");
        } else {
            utils.sendSuccessResponse(res, {'performanceObjects' : performanceObjects});
        }
    });
});

/*
  This function will get a performance Object to display on the performance page.
  Request body:
    - user
  Response:
    - success: true if got topBottom object, false otherwise
    - content: on success, a topBottom object with a top field (an array of strings) and bottom field (array of strings)
    - err: on error, an error message
*/
router.get('/topic', function(req, res) {
    Performance.getTopAndBottomTopics(req.currentUser._id, function(err, topBottom){
        if (err) {
            utils.sendErrResponse(res, 500, "An unknown error occured");
        } else {
            utils.sendSuccessResponse(res, {'topAndBottomTopics' : topBottom});
        }
    });
})

module.exports = router;
