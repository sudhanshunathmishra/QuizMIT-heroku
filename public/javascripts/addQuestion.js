(function() {

	$(document).on('click', '#submit-new-question', function(evt) {
      var content = $('#new-question-input').val();
      if (content.trim().length === 0) {
          alert('Input must not be empty');
          return;
      }
      $.post(
          '/questions/FR',
          { questionText: content,
          	tag: "" }
      ).done(function(response) {
          loadNewsFeed();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

})();