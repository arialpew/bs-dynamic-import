'use strict';


function lazyValue(param) {
  return "a";
}

var value = "b";

exports.lazyValue = lazyValue;
exports.value = value;
/* No side effect */
