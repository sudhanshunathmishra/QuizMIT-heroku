// See handlebarsjs.com for details. Here, we register
// a re-usable fragment of HTML called a "partial" which
// may be inserted somewhere in the DOM using a function
// call instead of manual insertion of an HTML String.
Handlebars.registerPartial('question', Handlebars.templates['question']);

//Helper to check if a user is the current user.
Handlebars.registerHelper('ifCheckUserSolution', function(isTrue, isSelected, options) {
	console.log("HANDLEBARS HELPER METHOD" + isTrue + isSelected);
    if (isTrue === isSelected){
        return options.fn(this)
    };
    return options.inverse(this)
});


// Global variable set when a user is logged in. Note
// that this is unsafe on its own to determine this: we
// must still verify every server request. This is just
// for convenience across all client-side code.
currentUser = undefined;

// A few global convenience methods for rendering HTML
// on the client. Note that the loadPage methods below
// fills the main container div with some specified
// template based on the relevant action.

var loadPage = function(template, data) {
	data = data || {};
	$('#main-container').html(Handlebars.templates[template](data));
};

var loadHomePage = function() {
	if (currentUser) {
		loadNewsFeed();
	} else {
		loadPage('index');
	}
};

var loadNewsFeed = function() {
	$.get('/users/newsfeed', function(response) {
		loadPage('newsfeed', {currentUser: response.content.user, points: response.content.points, responseArray: response.content.responseArray, feedbackTimes: response.content.feedbackTimes});
	});
};

var loadAddFRQuestionPage = function() {
	loadPage('addFRQuestion');
}

var loadAddMCQuestionPage = function() {
	loadPage('addMCQuestion');
}

var startQuiz = function(){
	var input_tags = $('#tag-input-question').val();
	var newTags = []
	input_tags = input_tags.split(",");
	input_tags.forEach(function(tag) {
					newTags.push(tag.trim());
				});

	$.post('/questions/quiz', {'input_tags': newTags}, function(response) {
		var listOfQuestionObjects= response.content.listOfQuestions
		if (listOfQuestionObjects.length > 0){
			var indexedQuestionObject = listOfQuestionObjects[0]
			var hasBack = false;
			var hasNext = (listOfQuestionObjects.length > 1 ? true : false)
			var listOfChoices = (indexedQuestionObject.question.choices.length > 0 ? indexedQuestionObject.question.choices : null)
			loadPage('takeQuiz', {question: indexedQuestionObject.question.questionString, index: 0,
									hasBack: hasBack, hasNext: hasNext, _id:indexedQuestionObject.question._id,
									quizId: response.content.quizId, choices: listOfChoices, startTime:indexedQuestionObject.responseTime});
		}
		else{
			//If there are no questions in the database for our quiz
			loadPage('takeQuiz');
		}
	});
}

var loadTakeQuizPage = function(quizId, index, previousIndex,previousContent,previousSelectedChoiceIndices, previousTime) {
	$.ajax({
  		url: '/questions/quiz',
  		type: 'PUT',
  		data: {quizId: quizId,
  			   indexToUpdate: previousIndex,
  			   newTimeOfIndex: previousTime,
  			   newContentOfIndex: previousContent,
  			   newSelectedChoiceIndices: previousSelectedChoiceIndices}
  	}).done(function(response){
		var listOfQuestionObjects= response.content.listOfQuestions
		if (listOfQuestionObjects.length > 0) {
			if (index < listOfQuestionObjects.length) {
				var indexedQuestionObject = listOfQuestionObjects[index];
				var hasBack = (index == 0 ? false : true);
				var hasNext = (index == listOfQuestionObjects.length-1 ? false : true);
				var endQuiz = !listOfQuestionObjects.some(function(questionObject) {
			       return questionObject.hasSubmitted === false;
			    })
				var listOfSelectedChoiceIndices = indexedQuestionObject.listOfSelectedChoiceIndices;
				var listOfChoices = null;
			    listOfChoices = (indexedQuestionObject.question.choices).map(function(choice, index){  //EXAMPLE OF FUNCTIONAL PROGRAMMING
			    	var isSelected = false;
			    	if(listOfSelectedChoiceIndices.indexOf(index) > -1){
			    		var isSelected = true;
			    	}
			    	return {'content': choice.content, 'isSelected': isSelected}
			    })

				loadPage('takeQuiz', {question: indexedQuestionObject.question.questionString, index: index,
										hasBack: hasBack, hasNext: hasNext, _id:indexedQuestionObject.question._id,
										quizId: quizId, choices:listOfChoices, hasSubmitted: indexedQuestionObject.hasSubmitted,
										endQuiz: endQuiz, startTime:indexedQuestionObject.responseTime,
										responseContent: indexedQuestionObject.content});
			}
		}
		else{
			//If there are no questions in the database for our quiz
			loadPage('takeQuiz');
		}
  	}).fail(function(err){
		var response = $.parseJSON(err.responseText);
        $('.error').text(response.err);
  	});
}

var loadPeerReviewPage = function() {
	$.get('/questions/response', function(response) {
		if (response.content.noResponse) {
			loadPage('peerReview');
		} else {
			loadPage('peerReview', {question: response.content.question, content: response.content.content, _id: response.content._id,
									solution: response.content.solution});
		}
	});
}

var loadQuizHistoryPage = function() {
	$.get('/performance/history', function(response) {
		if (response.content.noResponse) {
			loadPage('quizHistory');
		} else {
			loadPage('quizHistory', {listOfQuizzes: response.content.listOfQuizzes});
		}
	});
}

var loadPerformancePage = function(quizID) {
	$.get('/performance/quiz', {quizID: quizID}, function(response) {
		if (response.content.noResponse) {
			loadPage('performancePage');
		} else {
			loadPage('performancePage', {performanceObjects: response.content.performanceObjects}); //not question schema object
		}
	});
}

var loadPerformanceByTagsPage = function(userID) {
	$.get('/performance/topic', {userID: userID}, function(response){
		if (response.content.noResponse) {
			loadPage('performanceByTags');
		} else {
			loadPage('performanceByTags', {topAndBottomTopics: response.content.topAndBottomTopics});
		}
	});
}

$(document).ready(function() {
	var clock = $(".clock").FlipClock({
		clockFace: "MinuteCounter"
	})
	clock.setTime(100);
	$.get('/users/current', function(response) {
		if (response.content.loggedIn) {
			currentUser = response.content.user;
		}
		loadHomePage();
	});
});

$(document).on('click', '.home-link', function(evt) {
	evt.preventDefault();
	loadHomePage();
});

$(document).on('click', '#signin-btn', function(evt) {
	loadPage('signin');
});

$(document).on('click', '#register-btn', function(evt) {
	loadPage('register');
});


Handlebars.registerHelper('checkChoices', function(choices){
	if (choices.length > 0){
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});
