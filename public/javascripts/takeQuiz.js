(function() {

	$(document).on('click', '.submit-fr-quiz', function(evt) {
    clock.stop(); // Clock stops when you submit
    var item = $("#take-quiz-question");
    var questionID = item.data('question-id');
    var quizID = item.data('quiz-id');
    var content = $("#take-quiz-response").val();
    if (content.trim().length === 0) {
        alert('Input must not be empty');
        return;
    }
    var responseTime = parseInt(clock.getTime())
    $.post(
        '/questions/FRResponse',
        { questionID: questionID,
          contentText: content,
          quizID: quizID,
          responseTime: responseTime}
    ).done(function(response) {
      listOfQuestions = response.content.listOfQuestions;
      var endQuiz = !listOfQuestions.some(function(questionObject) {
       return questionObject.hasSubmitted === false;
      })
      if (endQuiz) {
        var quizButton = $('<a/>', {
          class: "btn btn-block btn-lg btn-warning submit-end-quiz",
          text: "End Quiz"
        });
        $('#end-quiz-container').append(quizButton);
      }
      $('.submit-fr-quiz').remove();
      $('#cancel-quiz-button').remove();
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
        $('.error').text(response.err);
    });
  });

  $(document).on('click', '.submit-mc-quiz', function(evt) {
    clock.stop(); // Clock stops when you submit
    var item = $("#take-quiz-question");
    var questionID = item.data('question-id');
    var quizID = item.data('quiz-id');
    var checkboxResponses = [];
    $("input[type=checkbox]").each(function() {
      checkboxResponses.push({choiceContent: $(this).parent().text(), isSelected: this.checked});
    })
    var responseTime = parseInt(clock.getTime())
    $.post(
        '/questions/MCResponse',
        { questionID: questionID,
          choices: checkboxResponses,
          quizID: quizID,
          responseTime: responseTime}
    ).done(function(response) {
      listOfQuestions = response.content.listOfQuestions;
      var endQuiz = !listOfQuestions.some(function(questionObject) {
       return questionObject.hasSubmitted === false;
      })
      if (endQuiz) {
        var quizButton = $('<a/>', {
          class: "btn btn-block btn-lg btn-warning submit-end-quiz",
          text: "End Quiz"
        });
        $('#end-quiz-container').append(quizButton);
      }
      $('.submit-mc-quiz').remove();
      $('#cancel-quiz-button').remove();
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
        $('.error').text(response.err);
    });
  });

  $(document).on('click', '.submit-end-quiz', function(evt) {
    loadHomePage();
  })

  $(document).on('click', '#previous-button-from-fr-question', function(evt) {
    clock.stop(); // Clock stops when you hit previous
    var item = $("#take-quiz-question");
    var index = item.data('question-index');
    var quizId = item.data('quiz-id');
    var content = $("#take-quiz-response").val();
    loadTakeQuizPage(quizId, index-1, index,content,[], parseInt(clock.getTime()));
  });

  $(document).on('click', '#previous-button-from-mc-question', function(evt) {
    clock.stop(); // Clock stops when you hit previous
    var item = $("#take-quiz-question");
    var index = item.data('question-index');
    var quizId = item.data('quiz-id');
    // var content = $(this).prev().prev().val().trim();
    var listOfSelectedChoiceIndices = [];
    $("input[type=checkbox]").each(function(choiceIndex) {
      if(this.checked){
        listOfSelectedChoiceIndices.push(choiceIndex);
      }
    })
    loadTakeQuizPage(quizId, index-1, index, "", listOfSelectedChoiceIndices, parseInt(clock.getTime()));
  });

  $(document).on('click', '#next-button-from-fr-question', function(evt) {
    clock.stop(); // Clock stops when you hit back
    var item = $("#take-quiz-question");
    var index = item.data('question-index');
    var quizId = item.data('quiz-id');
    var content = $("#take-quiz-response").val();
    loadTakeQuizPage(quizId, index+1, index, content, [],parseInt(clock.getTime()));
  });

    $(document).on('click', '#next-button-from-mc-question', function(evt) {
    clock.stop(); // Clock stops when you hit back
    var item = $("#take-quiz-question");
    var index = item.data('question-index');
    var quizId = item.data('quiz-id');
    // var content = $(this).prev().prev().val().trim();
    var listOfSelectedChoiceIndices = [];
    $("input[type=checkbox]").each(function(choiceIndex) {
      if(this.checked){
        listOfSelectedChoiceIndices.push(choiceIndex);
      }
    })
    loadTakeQuizPage(quizId, index+1, index,"",listOfSelectedChoiceIndices,parseInt(clock.getTime()));
  });

})();
