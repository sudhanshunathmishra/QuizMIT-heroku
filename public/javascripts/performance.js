(function() {
$(document).on('click', '.quiz-performance', function(evt) {
  var quizId = $(this).data('quiz-id');
  loadPerformancePage(quizId);
});

})();
