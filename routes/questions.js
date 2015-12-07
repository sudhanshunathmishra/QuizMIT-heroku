var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var User = require('../models/User')
var Feedback = require('../models/Feedback.js')
var Response = require('../models/Response.js')
var Quiz = require('../models/Quiz.js')
var Question = require('../models/Question.js')

/*
  Require authentication on ALL access to /tweets/*
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
  This function will put a FR question in the database.
  Request body:
    - questionText
    - tags
    - currentUser
    - solution
  Response:
    - success: true if added a FR question, false otherwise
    - err: on error, an error message
*/
router.post('/FR', function(req, res){
    Question.createFRQuestion(req.body.questionText, req.body.tags, req.currentUser._id,req.body.solution, function(err, question) {
        if (err) {
            if(err.taken){
                utils.sendErrResponse(res, 500, "This question is already taken. Create a different one!");
            }
            else{
                utils.sendErrResponse(res, 500, "An unknown error occured");
            }
        } else {
            utils.sendSuccessResponse(res);
        }
    });
});


/*
  This function will put an MC question in the databse.
  Request body:
    - questionText
    - tags
    - currentUser
    - choices
  Response:
    - success: true if added a MC question, false otherwise
    - err: on error, an error message
*/

router.post('/MC', function(req, res){
    Question.createMCQuestion(req.body.questionText, req.body.choices, req.body.tags, req.currentUser._id, function(err, question) {
        if (err) {
           if(err.taken){
                utils.sendErrResponse(res, 500, "This question is already taken. Create a different one!");
            }
            else{
                utils.sendErrResponse(res, 500, "An unknown error occured");
            }
        } else {
            utils.sendSuccessResponse(res);
        }
    });
});

/*
  This function will add a response to a FR question to the database.
  Request body:
    - questionID
    - contentText
    - currentUser
    - responseTime
    - quizID
  Response:
    - success: true if added FR {Response}, false otherwise
    - content: an object with a listOfQuestions field, which contains the question to which the response was directed.
    - err: on error, an error message
*/

router.post('/FRResponse', function(req, res){
    Response.createFRResponse(req.body.questionID, req.body.contentText, req.body.quizID, req.currentUser._id, req.body.responseTime, function(err, response) {
        if (err) {
            utils.sendErrResponse(res, 500, "An unknown error occured");
        } else {
            utils.sendSuccessResponse(res, {listOfQuestions: response.questions});
        }
    });
});


/*
  This function will add a response to a MC question to the database.
  Request body:
    - questionID
    - choices
    - currentUser
    - responseTime
    - quizID
  Response:
    - success: true if added FR {Response}, false otherwise
    - content: an object with a listOfQuestions field, which contains the question to which the response was directed.
    - err: on error, an error message
*/

router.post('/MCResponse', function(req, res){
    Response.createMCResponse(req.body.questionID, req.body.choices, req.body.quizID, req.currentUser._id, req.body.responseTime,function(err, response) {
        if (err) {
            utils.sendErrResponse(res, 500, "An unknown error occured");
        } else {
            utils.sendSuccessResponse(res, {listOfQuestions: response.questions});
        }
    });
});


/*
  This function will get a response.
  Request body:
  Response:
    - success: true if can get response, false otherwise
    - content: question string, response content, response id, question solution
    - err: on error, an error message
*/
router.get('/response', function(req, res){
    Response.getResponse(req.currentUser._id, function(err, response) {
        if (err) {
            utils.sendErrResponse(res, 500, "An unknown error occured");
        } else {
            if (response) {
                utils.sendSuccessResponse(res, {question: response.question.questionString, content: response.content, _id: response._id,
                                                    solution: response.question.solution});
            } else {
                utils.sendSuccessResponse(res, {noResponse: true});
            }
        }
    });

});

/*
  This function will get a piece of feedback.
  Request body:
    - responseID
    - feedback
    - currentUser
    - isCorrect
  Response:
    - success: true if can get feedback, false otherwise
    - err: on error, an error message
*/
router.post('/feedback', function(req, res){
    Feedback.createFeedback(req.body.responseID, req.body.feedback, req.currentUser._id, req.body.isCorrect, function(err, feedback) {
        if (err) {
            utils.sendErrResponse(res, 500, "An unknown error occured");
        } else {
            utils.sendSuccessResponse(res);
        }
    });

});


/*
  This function will help add a quiz to the database.
  Request body:
    - input_tags
    - currentUser
  Response:
    - success: true if can create quiz, false otherwise
    -content: quiz questions and quizID
    - err: on error, an error message
*/

router.post('/quiz', function(req, res){
    Quiz.createQuiz(req.body.input_tags, req.currentUser._id, function(err, quizDoc) {
        if (err) {
            utils.sendErrResponse(res, 500, "An unknown error occured");
        } else {
            utils.sendSuccessResponse(res, {listOfQuestions: quizDoc.questions, quizId: quizDoc._id});
        }
    });
});

/*
  Request body:
    - quizID
    - indexToUpdate
    - newContentOfIndex
    - newSelectedChoiceIndices
    - newTimeOfIndex
  Response:
    - success: true if can retrieveQuiz, false otherwise
    - content: quiz questions
    - err: on error, an error message
*/

router.put('/quiz', function(req, res){
    Quiz.retrieveQuiz(req.body.quizId, req.body.indexToUpdate, req.body.newContentOfIndex, req.body.newSelectedChoiceIndices, req.body.newTimeOfIndex, function(err, quizDoc) {
        if (err) {
            utils.sendErrResponse(res, 500, "An unknown error occured");
        } else {
            utils.sendSuccessResponse(res, {listOfQuestions: quizDoc.questions});
        }
    });
});

module.exports = router;
