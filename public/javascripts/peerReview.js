(function() {

	$(document).on('click', '#submit-feedback', function(evt) {
      var content = $('#new-feedback-input').val();
      var id = $(this).parent().data('response-id');
      if (content.trim().length === 0) {
          alert('Input must not be empty');
          return;
      }
      $.post(
          '/questions/feedback',
          { responseID: id,
            feedback: content }
      ).done(function(response) {
        loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

})();