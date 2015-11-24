(function() {

	$(document).on('click', '.submit-quiz', function(evt) {
      var item = $(this).parent();
      var id = item.data('question-id');
      var content = $(this).prev().val();
      if (content.trim().length === 0) {
          alert('Input must not be empty');
          return;
      }
      $.post(
          '/questions/response',
          { questionID: id,
            contentText: content }
      ).done(function(response) {
          item.remove();
          hasMoreQuestions = $("div").hasClass('question');
          if (!hasMoreQuestions) {
            loadHomePage();
          }
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

})();