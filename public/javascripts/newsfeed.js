(function() {

	$(document).on('click', '#add-fr-question-page', function(evt) {
		loadAddFRQuestionPage();
	})

	$(document).on('click', '#add-mc-question-page', function(evt) {
		loadAddMCQuestionPage();
	})

	$(document).on('click', '#take-quiz-page', function(evt) {
		var userPoints = $(this).data("user-points");
		if (userPoints-5 < 0) {
			alert("You don't have enough points. Add a question or do peer review before taking a quiz");
	        return;
		}
		startQuiz();
	})

	$(document).on('click', '#peer-review-page', function(evt) {
		loadPeerReviewPage();
	})

	$(document).on('click', '#quiz-history-page', function(evt) {
		loadQuizHistoryPage();
	})
})();
