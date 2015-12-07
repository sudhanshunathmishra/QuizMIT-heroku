(function() {

$(document).on('click', '.quiz-performance-tags', function(evt) {
  var userID = $(this).data('user-id');
  loadPerformanceTagsPage(userID);
});

})();