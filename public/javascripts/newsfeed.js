(function() {

	$(document).on('click', '#add-question-page', function(evt) {
		loadAddQuestionPage();
	})

	$(document).on('click', '#take-quiz-page', function(evt) {
		loadTakeQuizPage();
	})

	$(document).on('click', '#peer-review-page', function(evt) {
		loadPeerReviewPage();
	})

})();