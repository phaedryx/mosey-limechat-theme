/*-----------------------------------------------------------------------------
  A limechat theme by Tad Thorley
-----------------------------------------------------------------------------*/

function processNode(ev) {
  var inserted_node = ev.target;
  var prev_time = inserted_node.previousSibling.getElementsByClassName('time')[0];
  var curr_time = inserted_node.getElementsByClassName('time')[0];
  //TODO: debug this
  if(prev_time.innerText == curr_time.innerText) { curr_time.className += " duptime"; }
}

document.addEventListener("DOMNodeInserted", processNode, false);