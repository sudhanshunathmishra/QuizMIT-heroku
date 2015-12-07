(function() {

	$(document).on('click', '#submit-feedback', function(evt) {
      var content = $('#new-feedback-input').val();
      var id = $(this).parent().data('response-id');
      var isCorrect = document.getElementById('correct-checkbox').checked
      if (content.trim().length === 0) {
          alert('Input must not be empty');
          return;
      }

      $.post(
          '/questions/feedback',
          { responseID: id,
            feedback: content,
            isCorrect: isCorrect}
      ).done(function(response) {
        loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });
})();
