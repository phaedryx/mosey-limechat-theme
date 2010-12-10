/*-----------------------------------------------------------------------------
  A limechat theme by Tad Thorley
-----------------------------------------------------------------------------*/

String.prototype.startsWith = function(str) {
  return this.indexOf(str) == 0;
}

String.prototype.includes = function(str) {
  return this.indexOf(str) >= 0;
}

function doTimestamp(node) {
  var prev_time_node = node.previousSibling.firstChild;
  var curr_time_node = node.firstChild;
  if (prev_time_node.className.includes("time") && curr_time_node.className.includes("time")) {
    if (prev_time_node.innerHTML == curr_time_node.innerHTML) {
      curr_time_node.className += " duptime";
    }
  }
}

function findCssRule(rule)
{
  for (var i = 0; i < document.styleSheets.length; ++i) {
    for (var j = 0; j < document.styleSheets[i].cssRules.length; ++j) {
      if (document.styleSheets[i].cssRules[j].type == window.CSSRule.STYLE_RULE &&
	      document.styleSheets[i].cssRules[j].selectorText == rule) {
        return document.styleSheets[i].cssRules[j];
      }
    }
  }
  return null;
}

// Default to hiding the events
var showEvents = false;
function toggleEvents() {
  showEvents = !showEvents;
  updateEvents();
}
function updateEvents() {
  var css = findCssRule('.event');
  if (css != null) {
    css.style.display = showEvents ? 'block' : 'none';
  }
}
function doEvent(node) {
  if (node.className.includes("event")) {
    updateEvent(node);
  }
}

function createTopicNode() {
  // Only create the topic node once!
  var topic = document.getElementById('topic');
  if (topic == null) {
    if (document.body.getAttribute("type") == "channel" ||
        document.body.getAttribute("type") == "talk") {
      topic = document.createElement('div');
      topic.id = "topic";
      document.body.appendChild(topic);
    }
    if (document.body.getAttribute("type") == "talk") {
      setTopic("Private Chat");
    }
  }
  topic.onclick = function() { toggleEvents(); }
  // Hide or show all events that were created before code was run
  updateEvents();
}
function setTopic(topic) {
  	document.getElementById('topic').innerText = topic;
}
function doTopic(node) {
  // limechat doesn't mark topic events or their messages
  // as topic types and I think they should be
  if (node.className.includes("event")) {
    var message_node = node.lastChild;
    if (message_node.getAttribute("type") == "topic" ||
      message_node.innerText.startsWith("Topic: ")) {
	    setTopic(message_node.innerText.match(/opic: (.*)$/)[1]);
    }
  }
}

function processNode(ev) {
  if (document.body.getAttribute("type") == "channel") {
    var node = ev.target;
    doTimestamp(node);
    doTopic(node);
    doEvent(node);
  }
}

document.addEventListener("DOMNodeInserted", processNode, false);
// Not sure why DOMContentLoaded isn't working. Just call the function directly
// document.addEventListener("DOMContentLoaded", createTopicNode, false);
createTopicNode();