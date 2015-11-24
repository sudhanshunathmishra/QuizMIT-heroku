// See handlebarsjs.com for details. Here, we register
// a re-usable fragment of HTML called a "partial" which
// may be inserted somewhere in the DOM using a function
// call instead of manual insertion of an HTML String.
Handlebars.registerPartial('question', Handlebars.templates['question']);

//Helper to check if a user is the current user. 
// Handlebars.registerHelper('checkIfCurrentUser', function(user, options) {
//     if (user === currentUser){
//         return options.fn(this)
//     };
//     return options.inverse(this)
// });


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
		loadPage('newsfeed', { currentUser: currentUser });
	});
};

var loadAddQuestionPage = function() {
	loadPage('addQuestion');
}

var loadTakeQuizPage = function() {
	$.get('/questions/quiz', function(response) {
		loadPage('takeQuiz', {questions: response.content.questions});
	});
}

var loadPeerReviewPage = function() {
	$.get('/questions/response', function(response) {
		if (response.content.noResponse) {
			loadPage('peerReview');
		} else {
			loadPage('peerReview', {question: response.content.question, content: response.content.content, _id: response.content._id});
		}
	});
}

$(document).ready(function() {
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

