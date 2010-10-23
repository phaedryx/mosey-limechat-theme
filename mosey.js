/*-----------------------------------------------------------------------------
  A limechat theme by Tad Thorley
-----------------------------------------------------------------------------*/

String.prototype.startsWith = function(str) {
  return this.indexOf(str) == 0;
}

String.prototype.includes = function(str) {
  return this.indexOf(str) >= 0;
}

function markDuplicateTimestamp(node) {
  var prev_time_node = node.previousSibling.firstChild;
  var curr_time_node = node.firstChild;
  if(prev_time_node.innerHTML == curr_time_node.innerHTML) { 
    curr_time_node.className += " duptime";
  }  
}

// limechat doesn't mark topic event messages as topic types
// and some other type inconsistencies
function markEvent(node) {
  if(node.className.includes("event")) {
    node.setAttribute("type", "event")
  }
  markTopicEvent(node);
}

function markTopicEvent(node) {
  if(node.getAttribute("type") == "event") {
    var message_node = node.lastChild;
    if(message_node.innerText.startsWith("Topic")) {
      message_node.setAttribute("type", "topic");
    }
  }
}

function createTopic() {
  topic = document.createElement('div');
  topic.id = "topic";
  document.body.appendChild(topic);
  return topic;
}

function doTopic(node) {
  var topic = document.getElementById('topic') || createTopic();
  var message_node = node.lastChild;
  if(message_node.getAttribute("type") == "topic") {
    topic.innerText = message_node.innerText.match(/opic: (.*)/)[1];
  }
}

function processNode(ev) {
  // TODO: differentiate between the message panel and the console panel
  // fix some bugs
  var inserted_node = ev.target;
  markDuplicateTimestamp(inserted_node);
  markEvent(inserted_node);
  doTopic(inserted_node);
}

document.addEventListener("DOMNodeInserted", processNode, false);