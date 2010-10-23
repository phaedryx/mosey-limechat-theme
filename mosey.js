/*-----------------------------------------------------------------------------
  A limechat theme by Tad Thorley
-----------------------------------------------------------------------------*/

function markDuplicateTimestamps(node) {
  var prev_time = node.previousSibling.childNodes[0];
  var curr_time = node.childNodes[0];
  if(prev_time.innerHTML == curr_time.innerHTML) { 
    curr_time.className += " duplicate";
  }  
}

function processNode(ev) {
  var inserted_node = ev.target;
  markDuplicateTimestamps(inserted_node);
}

document.addEventListener("DOMNodeInserted", processNode, false);