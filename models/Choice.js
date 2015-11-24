
var Choice = (function Choice(content, correctness, selection) {

  var that = Object.create(Choice.prototype);

  that.getContent = function() {
    return content
  }

  that.getCorrectness = function() {
    return correctness
  }

  that.getSelection = function() {
    return selection
  }
  Object.freeze(that);
  return that;

}
