(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['addFRQuestion'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"section section-primary\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h3>Adding Free Response Question</h3>\n      </div>\n    </div>\n  </div>\n</div>\n\n<form class=\"form-horizontal\">\n  <fieldset>\n    <!-- Form Name -->\n    <!-- Text input-->\n    <div class=\"error\"></div>\n    <div class=\"form-group class-input-tag\">\n      <label class=\"col-md-4 control-label\" for=\"class-number\">Class Number</label>\n      <div class=\"col-md-5\">\n        <input id=\"class-number\" name=\"class-number\" type=\"text\" placeholder=\"Ex. 6.170\"\n        class=\"form-control input-md\" required autofocus>\n      </div>\n    </div>\n    <!-- Text input-->\n    <div class=\"form-group\">\n      <label class=\"col-md-4 control-label\" for=\"tag-input\">Topic Areas</label>\n      <div class=\"col-md-5\">\n        <input id=\"tag-input\" name=\"tag-input\" type=\"text\" placeholder=\"Ex. Javascript, Algorithm\"\n        class=\"form-control input-md\" required autofocus>\n      </div>\n    </div>\n    <!-- Textarea -->\n    <div class=\"form-group\">\n      <label class=\"col-md-4 control-label\" for=\"new-question-input\">Question</label>\n      <div class=\"col-md-4\">\n        <textarea class=\"form-control\" id=\"new-question-input\" name=\"new-question-input\" required autofocus></textarea>\n      </div>\n    </div>\n    <!-- Textarea -->\n    <div class=\"form-group\">\n      <label class=\"col-md-4 control-label\" for=\"solution\">Sample Solution</label>\n      <div class=\"col-md-4\">\n        <textarea class=\"form-control\" id=\"solution\" name=\"solution\" required autofocus></textarea>\n      </div>\n    </div>\n    <!-- Button (Double) -->\n  </fieldset>\n</form>\n<div class=\"section\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-5 text-right\">\n        <a id=\"submit-new-question\" class=\"btn btn-lg btn-success\">Submit</a>\n      </div>\n      <div class=\"col-md-7\">\n        <a class=\"btn btn-danger btn-lg home-link\">Cancel</a>\n      </div>\n    </div>\n  </div>\n</div>";
},"useData":true});
templates['addMCQuestion'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"section section-primary\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h3>Adding Multiple Choice Question</h3>\n      </div>\n    </div>\n  </div>\n</div>\n\n<form class=\"form-horizontal\">\n  <fieldset>\n    <!-- Form Name -->\n    <!-- Text input-->\n    <div class=\"error\"></div>\n    <div class=\"form-group class-input-tag\">\n      <label class=\"col-md-4 control-label\" for=\"class-number\">Class Number</label>\n      <div class=\"col-md-5\">\n        <input id=\"class-number\" name=\"class-number\" type=\"text\" placeholder=\"Ex. 6.170\"\n        class=\"form-control input-md\" required autofocus>\n      </div>\n    </div>\n    <!-- Text input-->\n    <div class=\"form-group\">\n      <label class=\"col-md-4 control-label\" for=\"tag-input\">Topic Areas</label>\n      <div class=\"col-md-5\">\n        <input id=\"tag-input\" name=\"tag-input\" type=\"text\" placeholder=\"Ex. Javascript, Algorithm\"\n        class=\"form-control input-md\" required autofocus>\n      </div>\n    </div>\n    <!-- Textarea -->\n    <div class=\"form-group\">\n      <label class=\"col-md-4 control-label\" for=\"new-mcquestion-input\">Question</label>\n      <div class=\"col-md-4\">\n        <textarea class=\"form-control\" id=\"new-mcquestion-input\" name=\"new-mcquestion-input\" required autofocus></textarea>\n      </div>\n    </div>\n    <!-- Textarea -->\n    <div class=\"form-group\">\n      <label class=\"col-md-4 control-label\" for=\"solution\">Sample Solution</label>\n      <div class=\"col-md-4\">\n        <div class=\"input-group\">\n          <span class=\"input-group-addon\">Correct\n            <input id=\"choice-one-correctness\" type=\"checkbox\" aria-label=\"...\">\n          </span>\n          <input id=\"new-choice-input-one\" type=\"text\" class=\"form-control\" aria-label=\"...\">\n        </div><!-- /input-group -->\n        <div class=\"input-group\">\n          <span class=\"input-group-addon\">Correct\n            <input id=\"choice-two-correctness\" type=\"checkbox\" aria-label=\"...\">\n          </span>\n          <input id=\"new-choice-input-two\" type=\"text\" class=\"form-control\" aria-label=\"...\">\n        </div><!-- /input-group -->\n        <div class=\"input-group\">\n          <span class=\"input-group-addon\">Correct\n            <input id=\"choice-three-correctness\" type=\"checkbox\" aria-label=\"...\">\n          </span>\n          <input id=\"new-choice-input-three\" type=\"text\" class=\"form-control\" aria-label=\"...\">\n        </div><!-- /input-group -->\n        <div class=\"input-group\">\n          <span class=\"input-group-addon\">Correct\n            <input id=\"choice-four-correctness\" type=\"checkbox\" aria-label=\"...\">\n          </span>\n          <input id=\"new-choice-input-four\" type=\"text\" class=\"form-control\" aria-label=\"...\">\n        </div><!-- /input-group -->\n      </div>\n    </div>\n    <!-- Button (Double) -->\n  </fieldset>\n</form>\n<div class=\"section\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-5 text-right\">\n        <a id=\"submit-new-mcquestion\" class=\"btn btn-lg btn-success\">Submit</a>\n      </div>\n      <div class=\"col-md-7\">\n        <a class=\"btn btn-danger btn-lg home-link\">Cancel</a>\n      </div>\n    </div>\n  </div>\n</div>";
},"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"header-container\">\n	<div class=\"video-container\">\n	<video autoplay=\"autoplay\" loop=\"loop\" volume=\"0\">\n		<source src=\"videos/welcomeCover.mp4\" type=\"video/mp4\">\n	</video>\n	</div>\n	<h1 id=\"welcome-heading\">Welcome to QuizMIT</h3>\n	<div class=\"welcome-buttons text-center\">\n		<a href=\"#\" class=\"btn btn-default btn-lg\" id=\"signin-btn\">Sign in</a>\n		<a href=\"#\" class=\"btn btn-default btn-lg\" id=\"register-btn\">Register</a>\n	</div>\n</div>\n";
},"useData":true});
templates['newsfeed'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"newsfeed-item section section-primary\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-md-1\">\n          	<span class=\"glyphicon glyphicon-user\"></span>\n          </div>\n          <div class=\"col-md-11\">\n            <h4>You took a quiz.</h4>\n            <p>Time: "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n          </div>\n        </div>\n      </div>\n    </div>\n\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"newsfeed-item section section-primary\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-md-1\">\n            <span class=\"glyphicon glyphicon-user\"></span>\n          </div>\n          <div class=\"col-md-11\">\n            <h4>You received feedback.</h4>\n            <p>Time: "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n          </div>\n        </div>\n      </div>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"section section-primary\"> <!-- Top Header displaying username and points and logout -->\n  <div class=\"container\"> \n    <div class=\"row\">\n      <div class=\"col-md-11\">\n        <h1>Welcome, "
    + alias4(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data}) : helper)))
    + "</h1>\n        <p>You currently have "
    + alias4(((helper = (helper = helpers.points || (depth0 != null ? depth0.points : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"points","hash":{},"data":data}) : helper)))
    + " points!</p>\n      </div>\n      <div class=\"col-md-1\">\n        <a id=\"logout-link\" class=\"btn btn-default\">Logout</a>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"section\"> <!-- Buttons: Add Question, Peer Review, Performance Review -->\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-4 text-center\">\n        <div class=\"btn-group btn-group-lg\">\n          <a class=\"btn btn-primary dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Add Question<span class=\"caret\"></span></a>\n          <ul class=\"dropdown-menu\" role=\"menu\">\n            <li>\n              <a href=\"#\" id=\"add-fr-question-page\">FR Question</a>\n            </li>\n            <li>\n            	<a href=\"#\" id=\"add-mc-question-page\">MC Question</a>\n            </li>\n          </ul>\n        </div>\n      </div>\n      <div class=\"col-md-4 text-center\">\n        <a id=\"peer-review-page\" class=\"btn btn-lg btn-primary\">Peer Review<br></a>\n      </div>\n      <div class=\"col-md-4 text-center\">\n        <a id=\"quiz-history-page\" class=\"btn btn-lg btn-primary\">Performance Review</a>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"section\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"input-group input-group-lg\">\n          <input type=\"text\" id=\"tag-input-question\" class=\"form-control\" placeholder=\"Type topics (ex. 6.01, 6.170) to take quiz on or leave blank for all questions\">\n          <span class=\"input-group-btn\">\n            <button id=\"take-quiz-page\" class=\"btn btn-primary\" data-user-points=\""
    + alias4(((helper = (helper = helpers.points || (depth0 != null ? depth0.points : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"points","hash":{},"data":data}) : helper)))
    + "\" type=\"button\">Take Quiz</button>\n          </span>\n        </div>\n        <!-- /input-group -->\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Newsfeed Info -->\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.responseArray : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.feedbackTimes : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['peerReview'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"performance-item section section-primary\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-md-11\">\n            <h4>Question: "
    + alias4(((helper = (helper = helpers.question || (depth0 != null ? depth0.question : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question","hash":{},"data":data}) : helper)))
    + "</h4>\n            <p>User Answer: "
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\n            <p>Suggested Solution: "
    + alias4(((helper = (helper = helpers.solution || (depth0 != null ? depth0.solution : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"solution","hash":{},"data":data}) : helper)))
    + "</p>\n            <textarea class=\"form-control\" id=\"new-feedback-input\" required autofocus/>\n            <div class=\"checkbox\">\n              <label>\n                <input type=\"checkbox\" id=\"correct-checkbox\">Correctly Answered\n              </label>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"section\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-md-12 text-center\">\n            <a id=\"submit-feedback\" class=\"btn btn-lg btn-success\" data-response-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">Submit</a>\n          </div>\n        </div>\n      </div>\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <h3>Nothing to Peer Review Right Now</h3>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div>\n  <div class=\"section section-primary\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-11 text-center\">\n          <h3>Peer Review</h3>\n        </div>\n        <div class=\"col-md-1\">\n          <a class=\"btn btn-default home-link\">Home</a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div>\n    <div class=\"error\"></div>\n  </div>\n\n\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.content : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['performanceByTags'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "        <li class=\"list-group-item-text\"> "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + " </li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <p class=\"list-group-item-text\"> No Topics Available. </p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div>\n    <button class=\"btn btn-default home-link\">Home</button>\n</div>\n<h4> Performance Page -- By Topic </h4>\n\n<h5>Top 5 Topics</h5>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.top : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n<h5>Bottom 5 Topics</h5>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.bottom : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n\n\n<textarea id=\"tag-input-question\" name=\"tag-input-question\" class=\"form-control\" placeholder=\"Insert your tags\"required autofocus/>\n\n";
},"useData":true});
templates['performancePage'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"performance-item section section-primary\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-11\">\n        <h4>Question: "
    + alias4(((helper = (helper = helpers.question || (depth0 != null ? depth0.question : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question","hash":{},"data":data}) : helper)))
    + "</h4>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.score : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <p>Average Response Time for this question: "
    + alias4(((helper = (helper = helpers.averageResponseTime || (depth0 != null ? depth0.averageResponseTime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"averageResponseTime","hash":{},"data":data}) : helper)))
    + "</p>\n        <p>Your Response Time: "
    + alias4(((helper = (helper = helpers.responseTime || (depth0 != null ? depth0.responseTime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"responseTime","hash":{},"data":data}) : helper)))
    + "</p>\n        <p>Speed Analysis: "
    + alias4(((helper = (helper = helpers.relativeSpeed || (depth0 != null ? depth0.relativeSpeed : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"relativeSpeed","hash":{},"data":data}) : helper)))
    + "</p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.solution : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.choices : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + "      </div>\n    </div>\n  </div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <p>Your Score: "
    + alias4(((helper = (helper = helpers.score || (depth0 != null ? depth0.score : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"score","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.numChoices || (depth0 != null ? depth0.numChoices : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"numChoices","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <p>Solution: "
    + container.escapeExpression(((helper = (helper = helpers.solution || (depth0 != null ? depth0.solution : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"solution","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "            <div class=\"col-md-12\">\n              <div class=\"col-md-2\">\n                <ul class=\"list-group\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.choices : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </ul>\n              </div>\n              <div class=\"col-md-10\">\n                <ul class=\"list-group\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.choices : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </ul>\n              </div>\n            </div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.isSelected : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    return "                        <li class=\"list-group-item mc-performance-item\">Selected</li>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "                        <li class=\"list-group-item mc-performance-item\">Not Selected</li>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifCheckUserSolution || (depth0 && depth0.ifCheckUserSolution) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.isTrue : depth0),(depth0 != null ? depth0.isSelected : depth0),{"name":"ifCheckUserSolution","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <li class=\"list-group-item list-group-item-success\">"
    + container.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"content","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <li class=\"list-group-item list-group-item-danger\">"
    + container.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"content","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.feedback : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(20, data, 0),"data":data})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                <p>FEEDBACK: "
    + container.escapeExpression(((helper = (helper = helpers.feedback || (depth0 != null ? depth0.feedback : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"feedback","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"20":function(container,depth0,helpers,partials,data) {
    return "                <p>No Feedback Yet</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"section section-primary\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-11 text-center\">\n        <h3>Performance on Quiz</h3>\n      </div>\n      <div class=\"col-md-1\">\n        <a class=\"btn btn-default home-link\">Home</a>\n      </div>\n    </div>\n  </div>\n</div>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.performanceObjects : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['question'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"question\" data-question-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n  <h4>"
    + alias4(((helper = (helper = helpers.question || (depth0 != null ? depth0.question : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question","hash":{},"data":data}) : helper)))
    + "</h4>\n  <textarea class=\"form-control\" required autofocus/>\n  <button class=\"btn btn-lg btn-success btn-block submit-quiz\">Submit</button>\n</div>\n";
},"useData":true});
templates['quizHistory'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "			<button type=\"button\" class=\"list-group-item quiz-performance\" data-quiz-id="
    + alias1(container.lambda(depth0, depth0))
    + ">Quiz "
    + alias1(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
    + "</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"section section-primary\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-11 text-center\">\n        <h3>Performance Review</h3>\n      </div>\n      <div class=\"col-md-1\">\n        <a class=\"btn btn-default home-link\">Home</a>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"section\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <ul class=\"lead list-group text-center text-primary\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.listOfQuizzes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </div>\n    </div>\n  </div>\n</div>\n\n";
},"useData":true});
templates['register'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"header-container\">\n  <div class=\"video-container\">\n  <video autoplay=\"autoplay\" loop=\"loop\" volume=\"0\">\n    <source src=\"videos/welcomeCover.mp4\" type=\"video/mp4\">\n  </video>\n  </div>\n    <div class=\"welcome-buttons text-center\">\n      <div id=\"register\">\n        <a href=\"#\" class=\"home-link\">Back to Home</a>\n        <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n        <form class=\"form-signin\" id=\"register-form\">\n          <h2 class=\"form-signin-heading\">Register</h2>\n          <input type=\"text\" name=\"username\" class=\"form-control\" placeholder=\"Username\" required autofocus/>\n          <input type=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\" required autofocus/>\n          <input type=\"password\" id=\"password\" name=\"confirm\" class=\"form-control\" placeholder=\"Confirm Password\" required autofocus/>\n          <button class=\"btn btn-lg btn-default btn-block\" type=\"submit\">Register</button>\n        </form>\n      </div>\n    </div>\n</div>\n\n";
},"useData":true});
templates['signin'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "          "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"header-container\">\n  <div class=\"video-container\">\n  <video autoplay=\"autoplay\" loop=\"loop\" volume=\"0\">\n    <source src=\"videos/welcomeCover.mp4\" type=\"video/mp4\">\n  </video>\n  </div>\n  <div class=\"welcome-buttons text-center\">\n    <div id=\"signin\">\n      <a href=\"#\" class=\"home-link\">Back to Home</a>\n      <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </div>\n      <form class=\"form-signin\" id=\"signin-form\">\n        <h2 class=\"form-signin-heading\">Please sign in</h2>\n        <input type=\"text\" name=\"username\" class=\"form-control\" placeholder=\"Username\" required autofocus/>\n        <input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\" required autofocus/>\n        <button class=\"btn btn-lg btn-default btn-block\" type=\"submit\">Sign in</button>\n      </form>\n    </div>\n  </div>\n</div>\n\n";
},"useData":true});
templates['takeQuiz'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div id=\"take-quiz-question\" class=\"section\" data-quiz-id="
    + alias4(((helper = (helper = helpers.quizId || (depth0 != null ? depth0.quizId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quizId","hash":{},"data":data}) : helper)))
    + " data-question-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + " data-question-index="
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + ">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-md-8\">\n            <h3 class=\"text-primary\">"
    + alias4(((helper = (helper = helpers.question || (depth0 != null ? depth0.question : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question","hash":{},"data":data}) : helper)))
    + "</h3>\n            <hr>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.choices : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "          </div>\n          <div class=\"col-md-4\">\n            <div class = \"clock\"> </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"section\">\n        <div class=\"container\">\n          <div class=\"row\">\n            <div class=\"col-md-5 text-left\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasBack : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasSubmitted : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data})) != null ? stack1 : "")
    + "            <div class=\"col-md-5 text-right\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasNext : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"section\">\n        <div class=\"container\">\n          <div class=\"row\">\n            <div id=\"end-quiz-container\" class=\"col-md-12 text-center\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.endQuiz : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "              <div class=\"checkbox\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.isSelected : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "              </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                  <label><input type=\"checkbox\" class=\"checkbox\" checked>"
    + container.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"content","hash":{},"data":data}) : helper)))
    + "</label>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                  <label><input type=\"checkbox\" class=\"checkbox\">"
    + container.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"content","hash":{},"data":data}) : helper)))
    + "</label>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "              <p>\n                <textarea id=\"take-quiz-response\" rows=\"4\" class=\"form-control\" required autofocus >"
    + container.escapeExpression(((helper = (helper = helpers.responseContent || (depth0 != null ? depth0.responseContent : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"responseContent","hash":{},"data":data}) : helper)))
    + "</textarea>\n              </p>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.choices : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    return "                    <a id=\"previous-button-from-mc-question\" class=\"btn btn-lg btn-primary\">Back</a>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "                    <a id=\"previous-button-from-fr-question\" class=\"btn btn-lg btn-primary\">Back</a>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "              <div class=\"col-md-2 text-center\">\n              </div>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "              <div class=\"col-md-1 text-left\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.choices : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(19, data, 0),"data":data})) != null ? stack1 : "")
    + "              </div>\n              <div class=\"col-md-1\">\n                <a id=\"cancel-quiz-button\" class=\"btn btn-danger btn-lg home-link\">Cancel</a>\n              </div>\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "                  <a class=\"btn btn-lg btn-success submit-mc-quiz\">Submit</a>\n";
},"19":function(container,depth0,helpers,partials,data) {
    return "                  <a class=\"btn btn-lg btn-success submit-fr-quiz\">Submit</a>\n";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.choices : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.program(24, data, 0),"data":data})) != null ? stack1 : "");
},"22":function(container,depth0,helpers,partials,data) {
    return "                    <a id=\"next-button-from-mc-question\" class=\"btn btn-lg btn-primary\">Next</a>\n";
},"24":function(container,depth0,helpers,partials,data) {
    return "                    <a id=\"next-button-from-fr-question\" class=\"btn btn-lg btn-primary\">Next</a>\n";
},"26":function(container,depth0,helpers,partials,data) {
    return "                <a class=\"btn btn-block btn-lg btn-warning submit-end-quiz\">End Quiz</a>\n";
},"28":function(container,depth0,helpers,partials,data) {
    return "    <p><em>No questions added yet</em></p>\n";
},"30":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "  clock = $(\".clock\").FlipClock("
    + container.escapeExpression(((helper = (helper = helpers.startTime || (depth0 != null ? depth0.startTime : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"startTime","hash":{},"data":data}) : helper)))
    + ",{\n      autoStart: false,\n      clockFace: \"MinuteCounter\"\n    })\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasSubmitted : depth0),{"name":"if","hash":{},"fn":container.program(31, data, 0),"inverse":container.program(33, data, 0),"data":data})) != null ? stack1 : "");
},"31":function(container,depth0,helpers,partials,data) {
    return "    clock.stop()\n";
},"33":function(container,depth0,helpers,partials,data) {
    return "    clock.start()\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"section section-primary\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-11 text-center\">\n        <h3>Taking a Quiz</h3>\n      </div>\n      <div class=\"col-md-1\">\n        <a class=\"btn btn-default home-link\">Home</a>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div>\n  <div>\n    <div class=\"error\"></div>\n  </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.question : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(28, data, 0),"data":data})) != null ? stack1 : "")
    + "\n</div>\n\n<script> \n"
    + ((stack1 = (helpers.ifClock || (depth0 && depth0.ifClock) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.startTime : depth0),{"name":"ifClock","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n  </script>\n";
},"useData":true});
})();