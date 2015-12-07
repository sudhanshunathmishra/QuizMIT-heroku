(function() {

	$(document).on('click', '#submit-new-question', function(evt) {
			var tags = $('#tag-input').val();
			var newTags = []
			tags = tags.split(",");
			tags.forEach(function(tag) {
				newTags.push(tag.trim());
			});

			var classNumber = $('#class-number').val();
			if (classNumber.trim().length === 0) {
          alert('Please insert the class number');
          return;
      }
			else {
				newTags.push(classNumber);
			}

      var content = $('#new-question-input').val();
      if (content.trim().length === 0) {
          alert('Input must not be empty');
          return;
      }

			var mySolution = $('#solution').val();
			if (mySolution.trim().length === 0) {
					alert('You must provide a solution to the question');
					return;
			}

      $.post(
          '/questions/FR',
          { questionText: content,
          	tags: newTags,
					 	solution: mySolution}
      ).done(function(response) {
          loadNewsFeed();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  $(document).on('click', '#submit-new-mcquestion', function(evt) {
      var questionContent = $('#new-mcquestion-input').val();
      var choiceOneContent = $('#new-choice-input-one').val();
      var choiceTwoContent = $('#new-choice-input-two').val();
      var choiceThreeContent = $('#new-choice-input-three').val();
      var choiceFourContent = $('#new-choice-input-four').val();


			if (choiceOneContent.trim().length === 0) {
					alert('Please insert a choice in Choice One');
					return;
			}
			if (choiceTwoContent.trim().length === 0) {
					alert('Please insert a choice in Choice Two');
					return;
			}

			if (choiceThreeContent.trim().length === 0) {
					alert('Please insert a choice in Choice Three');
					return;
			}

			if (choiceFourContent.trim().length === 0) {
					alert('Please insert a choice in Choice Four');
					return;
			}

			var correctOne = $('#choice-one-correctness').is(":checked");
			var correctTwo = $('#choice-two-correctness').is(":checked");
			var correctThree = $('#choice-three-correctness').is(":checked");
			var correctFour = $('#choice-four-correctness').is(":checked");


			var tags = $('#tag-input').val();
			var newTags = []
			tags = tags.split(",");
			tags.forEach(function(tag) {
				newTags.push(tag.trim());
			});

      var classNumber = $('#class-number').val();
      if (classNumber.trim().length === 0) {
          alert('Please insert the class number');
          return;
      }
      else {
        newTags.push(classNumber);
      }

      listOfChoices = [{content: choiceOneContent, isTrue: correctOne}, {content: choiceTwoContent, isTrue: correctTwo},
      {content: choiceThreeContent, isTrue: correctThree}, {content: choiceFourContent, isTrue: correctFour}]
      if (questionContent.trim().length === 0) {
          alert('Input must not be empty');
          return;
      }
      $.post(
          '/questions/MC',
          { questionText: questionContent,
            choices: listOfChoices,
            tags: newTags }
      ).done(function(response) {
          loadNewsFeed();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

})();
