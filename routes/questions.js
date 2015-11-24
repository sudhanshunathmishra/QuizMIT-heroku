var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var User = require('../models/User')

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

router.post('/FR', function(req, res){
    User.createFRQuestion(req.body.questionText, req.body.tag, function(err, question) {
        if (err) {
            utils.sendErrResponse(res, 500, "An unknown error occured");
        } else {
            utils.sendSuccessResponse(res);
        }
    });
});

router.post('/response', function(req, res){
    User.createResponse(req.body.questionID, req.body.contentText, function(err, response) {
        if (err) {
            utils.sendErrResponse(res, 500, "An unknown error occured");
        } else {
            utils.sendSuccessResponse(res);
        }
    });
});

router.get('/response', function(req, res){
    User.getResponse(function(err, response) {
        if (err) {
            utils.sendErrResponse(res, 500, "An unknown error occured");
        } else {
            if (response) {
                utils.sendSuccessResponse(res, {question: response.question.question, content: response.content, _id: response._id});
            } else {
                utils.sendSuccessResponse(res, {noResponse: true});
            }
        }
    });

});

router.post('/feedback', function(req, res){
    User.createFeedback(req.body.responseID, req.body.feedback, function(err, feedback) {
        if (err) {
            utils.sendErrResponse(res, 500, "An unknown error occured");
        } else {
            utils.sendSuccessResponse(res);
        }
    });

});

router.get('/quiz', function(req, res){
    User.createQuiz(req.body.input_tags, function(err, quiz) {
        if (err) {
            utils.sendErrResponse(res, 500, "An unknown error occured");
        } else {
            utils.sendSuccessResponse(res, {questions: quiz});
        }
    });

});

module.exports = router;
