var assert = require("assert");

var mongoose = require('mongoose');

var User = require('../models/User');
var Feedback = require('../models/Feedback');
var Performance = require('../models/Performance');
var Quiz = require('../models/Quiz');
var Response = require('../models/Response');
var Question = require('../models/Question');

var feedbackSchema = require('../models/feedbackSchema');
var questionSchema = require('../models/questionSchema');
var quizSchema = require('../models/quizSchema');
var responseSchema = require('../models/responseSchema');
var userSchema = require('../models/userSchema');

describe('User', function() {


    before(function(){
        mongoose.connect('mongodb://localhost/testDB');    
    });

    beforeEach(function(done) {
        mongoose.connection.db.dropDatabase();
        done();
    });

    afterEach(function(done) {
        mongoose.connection.db.dropDatabase();
        done();
    });

    after(function(){
        mongoose.connection.db.dropDatabase();
        mongoose.connection.close();
    });

    describe('#createNewUser', function(){
        it('Creating new user', function(done){
            User.createNewUser('Suyash', 'suyash_password', function(err, user){
                if(!err){
                    userSchema.find({}, function(err, results){
                        //console.log("USER___ : " + results[0])
                        assert.equal(results[0].username, 'Suyash');
                        done();
                    });
                }
            });
        });
    });


    describe('#createMCQuestion', function(){
        it('Creating new MC question', function(done){
            var choiceList = ['choice A', 'choice B', 'choice C', 'choice D'];
            var taglist = ['tagA', 'tagB', 'tagC', 'tagD'];

            User.createNewUser('Suyash', 'suyash_password', function(err, user){
                if(!err){
                    Question.createMCQuestion('New MC Question?', choiceList, taglist, user._id, function(err, newMCQuestion) {
                        questionSchema.find({}, function(err, results){
                            //console.log("RESULTS TESTING: " + results);
                            assert.equal(results.length, 1);
                            assert.equal(results[0].questionString, 'New MC Question?');
                            done();
                        });
                    });                 
                }
            });
        });
    });

    describe('#createFRQuestion', function(){
        it('Creating new FR question', function(done){
            var taglist = ["tagA", "tagB", "tagC", "tagD"];
            User.createNewUser('Suyash', 'suyash_password', function(err, user){
                Question.createFRQuestion('New FR Question?', taglist, user._id, 'Correct!', function(err, newMCQuestion) {
                    questionSchema.find({}, function(err, results){
                        //console.log("RESULTS TESTING: " + results);
                        assert.equal(results.length, 1);
                        assert.equal(results[0].questionString, 'New FR Question?');
                        assert.equal(results[0].solution, 'Correct!');
                        done();
                    });
                });
            });
        });
    });


    describe('#createFRResponse', function(){

        it('Creating new FR response', function(done){
            var taglist = ["tagA", "tagB", "tagC", "tagD"];
            var contentText = 'Here is a response!';
            var responseTime = 5;

            User.createNewUser('Suyash', 'suyash_password', function(err, user){
                Question.createFRQuestion('New FR Question?', taglist, user._id, 'Correct!', function(err, newFRQuestion) {
                    Quiz.createQuiz([], user._id, function(err, listOfQuestions, quiz){
                        Response.createFRResponse(newFRQuestion._id, contentText, quiz._id, user._id, responseTime, function(err, newFRResponse){
                            responseSchema.find({}, function(err, results){
                                //console.log("RESULTS TESTING: " + results);
                                assert.equal(results.length, 1);
                                assert.equal(results[0].content, contentText);
                                done();
                            });
                        });
                    });
                });
            });

        });

    });

    //  that.createMCResponse = function(questionID, choices, quizID, userID, responseTime,callback) {
    describe('#createMCResponse', function(){

        it('Creating new MC response', function(done){
            var taglist = ["tagA", "tagB", "tagC", "tagD"];
            var choiceList = ['choice A', 'choice B', 'choice C', 'choice D'];
            var contentText = 'Here is a response!';
            var responseTime = 5;

            User.createNewUser('Suyash', 'suyash_password', function(err, user){
                Question.createMCQuestion('New MC Question?', choiceList, taglist, user._id, function(err, newMCQuestion) {
                    Quiz.createQuiz([], user._id, function(err, listOfQuestions, quiz){
                        Response.createMCResponse(newMCQuestion._id, choiceList, quiz._id, user._id, responseTime, function(err, newQuiz, newFRResponse){
                            responseSchema.find({})
                            .populate('question', 'questionString')
                            .exec(function(err, results){
                                //console.log("RESULTS TESTING: " + results);
                                assert.equal(results.length, 1);
                                assert.equal(results[0].question.questionString, newMCQuestion.questionString);
                                done();
                            });
                        });
                    });
                });
            });
            
        });

    });

    describe('#getResponse', function(){

        it('Getting response', function(done){
            var taglist = ["tagA", "tagB", "tagC", "tagD"];
            var contentText = 'Here is a response!';
            var responseTime = 5;

            User.createNewUser('Suyash', 'suyash_password', function(err, user){
                User.createNewUser('Ryan', 'ryan_password', function(err, userRyan){
                    Question.createFRQuestion('New FR Question?', taglist, user._id, 'Correct!', function(err, newFRQuestion) {
                        Quiz.createQuiz([], user._id, function(err, listOfQuestions, quiz){
                            Response.createFRResponse(newFRQuestion._id, contentText, quiz._id, user._id, responseTime, function(err, newFRResponse){
                                Response.getResponse(userRyan._id, function(err, response){
                                    //console.log("RESPONSE: " + response);
                                    assert.equal(response.choices.length, 0); //Sufficient, as we are getting a random FR response
                                    done();
                                });
                            });
                        });
                    });
                });
            });

        });

    });

    describe('#getUserQuiz', function(){
        it('Getting quiz timestamps', function(done){
            var taglist = ["tagA", "tagB", "tagC", "tagD"];
            var contentText = 'Here is a response!';
            var responseTime = 5;

            User.createNewUser('Suyash', 'suyash_password', function(err, user){
                Question.createFRQuestion('New FR Question?', taglist, user._id, 'Correct!', function(err, newFRQuestion) {
                    Quiz.createQuiz([], user._id, function(err, listOfQuestions, quiz){
                        Response.createFRResponse(newFRQuestion._id, contentText, quiz._id, user._id, responseTime, function(err, newFRResponse){
                            Quiz.getUserQuiz(user._id, function(err, timesArray){
                                //console.log("RESPONSE: " + timesArray);
                                assert.equal(timesArray.length, 1);
                                assert.equal(false, timesArray[0] instanceof Date);
                                done();
                            });
                        });
                    });
                });
            });

        });
    });


    describe('#getFeedbackTimestamps', function(){
        it('Getting feedback timestamps', function(done){
            var taglist = ["tagA", "tagB", "tagC", "tagD"];
            var responseText = 'Here is a response!';
            var feedbackText = 'Here is some feedback!';
            var responseTime = 5;
            var isCorrect = true;

            User.createNewUser('Suyash', 'suyash_password', function(err, user){
                Question.createFRQuestion('New FR Question?', taglist, user._id, 'Correct!', function(err, newFRQuestion) {
                    Quiz.createQuiz([], user._id, function(err, listOfQuestions, quiz){
                        Response.createFRResponse(newFRQuestion._id, responseText, quiz._id, user._id, responseTime, function(err, newQuiz, newFRResponse){
                            //console.log("newFR RESPONSE: " + newFRResponse);
                            Feedback.createFeedback(newFRResponse._id, feedbackText, user._id, isCorrect, function(err, newFeedback){
                                Feedback.getFeedbackTimestamps(user._id, function(err, feedbackTimestamps){
                                    assert.equal(feedbackTimestamps.length, 1);
                                    done();
                                });
                            });
                        });
                    });
                });
            });

        });
    });


    describe('#createFeedback', function(){

        it('Creating new feedback', function(done){
            var taglist = ["tagA", "tagB", "tagC", "tagD"];
            var responseText = 'Here is a response!';
            var feedbackText = 'Here is some feedback!';
            var responseTime = 5;
            var isCorrect = true;

            User.createNewUser('Suyash', 'suyash_password', function(err, user){
                Question.createFRQuestion('New FR Question?', taglist, user._id, 'Correct!', function(err, newFRQuestion) {
                    Quiz.createQuiz([], user._id, function(err, listOfQuestions, quiz){
                        Response.createFRResponse(newFRQuestion._id, responseText, quiz._id, user._id, responseTime, function(err, newQuiz, newFRResponse){
                            //console.log("newFR RESPONSE: " + newFRResponse);
                            Feedback.createFeedback(newFRResponse._id, feedbackText, user._id, isCorrect, function(err, newFeedback){
                                feedbackSchema.find({}, function(err, results) {
                                    //console.log("RESULTS TESTING: " + results);
                                    assert.equal(results.length, 1);
                                    assert(results[0].content, feedbackText);
                                    done();
                                }); 
                            });
                        });
                    });
                });
            });

        });

    });

    
    describe('#createQuiz', function(){
        //  that.createQuiz = function(inputTags, userID, callback) {
        it('Creating new quiz', function(done){
            var taglist = ["tagA", "tagB", "tagC", "tagD"];
            User.createNewUser('Suyash', 'suyash_password', function(err, user){
                Quiz.createQuiz(taglist, user._id, function(err, listOfQuestions, quiz){
                    quizSchema.find({}, function(err, results){
                        //console.log("RESULTS TESTING: " + results);
                        assert(results.length, 1);
                        assert(results[0].user, user._id);
                        done();
                    });
                });
            });
        });
    });

    describe('#getQuizHistory', function(){
        //  that.createQuiz = function(inputTags, userID, callback) {
        it('Getting quiz history', function(done){
            var taglist = ["tagA", "tagB", "tagC", "tagD"];
            User.createNewUser('Suyash', 'suyash_password', function(err, user){
                Question.createFRQuestion('New FR Question?', [], user._id, 'Correct!', function(err, newMCQuestion) {
                    Quiz.createQuiz(taglist, user._id, function(err, listOfQuestions, quiz){
                        Quiz.getQuizHistory(user._id, function(err, quizIDArray){
                            quizSchema.find({}, function(err, results){
                                assert(results.length, 1);
                                done();
                            });
                        });

                    });
                });
            });
        });
    });

    describe('#getPerformance', function(){
        it('Creating new feedback', function(done){
            var taglist = ["tagA", "tagB", "tagC", "tagD"];
            var responseText = 'Here is a response!';
            var feedbackText = 'Here is some feedback!';
            var responseTime = 5;
            var isCorrect = true;

            User.createNewUser('Suyash', 'suyash_password', function(err, user){
                Question.createFRQuestion('New FR Question?', taglist, user._id, 'Correct!', function(err, newFRQuestion) {
                    Quiz.createQuiz([], user._id, function(err, listOfQuestions, quiz){
                        Response.createFRResponse(newFRQuestion._id, responseText, quiz._id, user._id, responseTime, function(err, newQuiz, newFRResponse){
                            Feedback.createFeedback(newFRResponse._id, feedbackText, user._id, isCorrect, function(err, newFeedback){
                                Performance.getPerformance(newQuiz._id, function(err, performanceObjects){
                                    assert.equal(performanceObjects instanceof Object, true);
                                    done();
                                });
                                
                            });
                        });
                    });
                });
            });

        });
    });


});