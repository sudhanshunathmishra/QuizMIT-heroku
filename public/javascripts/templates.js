(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['addQuestion'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\n	<button class=\"btn btn-default home-link\">Back</button>\n	<h3>Add a Question</h2>\n	<div class=\"error\"></div>\n	<textarea id=\"new-question-input\" name=\"new-question-input\" class=\"form-control\" required autofocus/>\n	<button class=\"btn btn-lg btn-info btn-block\" id=\"submit-new-question\">Add</button>\n</div>";
},"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"inner cover\" id=\"homepage\">\n	<h1 class=\"cover-heading\">Welcome to QuizMIT</h1>\n	<p class=\"lead\">You must be signed in to continue.</p>\n	<p class=\"lead\">\n	  <button class=\"btn btn-default btn-lg\" id=\"signin-btn\">Sign in</button>\n	  <button class=\"btn btn-default btn-lg\" id=\"register-btn\">Register</button>\n	</p>\n</div>\n";
},"useData":true});
templates['newsfeed'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h2>Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a style=\"color: #4099FF;\" href=\"#\" id=\"logout-link\">logout</a>)</h2>\n<h3>This is going to be your news feed.</h3>\n<div>\n    <button class=\"btn btn-default\" id=\"add-question-page\">Add Question</button>\n    <button class=\"btn btn-default\" id=\"take-quiz-page\">Take a Quiz</button>\n    <button class=\"btn btn-default\" id=\"peer-review-page\">Peer Review</button>\n</div>";
},"useData":true});
templates['peerReview'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"peer-review\" data-response-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n      <h4>Question: "
    + alias4(((helper = (helper = helpers.question || (depth0 != null ? depth0.question : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question","hash":{},"data":data}) : helper)))
    + "</h4>\n      <h5>User Answer: "
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</h5>\n      <textarea class=\"form-control\" id=\"new-feedback-input\" required autofocus/>\n      <button class=\"btn btn-lg btn-success btn-block\" id=\"submit-feedback\">Submit</button>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div>\n  <div>\n    <button class=\"btn btn-default home-link\">Back</button>\n  </div>\n  <div>\n    <div class=\"error\"></div>\n  </div>\n\n  <h2>Peer Review</h2>\n\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.content : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['question'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"question\" data-question-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n  <h4>"
    + alias4(((helper = (helper = helpers.question || (depth0 != null ? depth0.question : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question","hash":{},"data":data}) : helper)))
    + "</h4>\n  <textarea class=\"form-control\" required autofocus/>\n  <button class=\"btn btn-lg btn-success btn-block submit-quiz\">Submit</button>\n</div>\n";
},"useData":true});
templates['register'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"register\">\n  <a href=\"#\" class=\"home-link\">Back to Home</a>\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <form class=\"form-signin\" id=\"register-form\">\n    <h2 class=\"form-signin-heading\">Register</h2>\n    <input type=\"text\" name=\"username\" class=\"form-control\" placeholder=\"Username\" required autofocus/>\n    <input type=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\" required autofocus/>\n    <input type=\"password\" id=\"password\" name=\"confirm\" class=\"form-control\" placeholder=\"Confirm Password\" required autofocus/>\n    <button class=\"btn btn-lg btn-default btn-block\" type=\"submit\">Register</button>\n  </form>\n</div>\n";
},"useData":true});
templates['signin'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"signin\">\n  <a href=\"#\" class=\"home-link\">Back to Home</a>\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <form class=\"form-signin\" id=\"signin-form\">\n    <h2 class=\"form-signin-heading\">Please sign in</h2>\n    <input type=\"text\" name=\"username\" class=\"form-control\" placeholder=\"Username\" required autofocus/>\n    <input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\" required autofocus/>\n    <button class=\"btn btn-lg btn-default btn-block\" type=\"submit\">Sign in</button>\n  </form>\n</div>\n";
},"useData":true});
templates['takeQuiz'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.question,depth0,{"name":"question","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p><em>No questions added yet</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div>\n  <div>\n    <button class=\"btn btn-default home-link\">Back</button>\n  </div>\n  <div>\n    <div class=\"error\"></div>\n  </div>\n\n  <h2>Quiz</h2>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.questions : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"usePartial":true,"useData":true});
})();