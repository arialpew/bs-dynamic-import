'use strict';


function lazyValue() {
  return "a";
}

var $$default = "c";

var value = "b";

exports.$$default = $$default;
exports.default = $$default;
exports.__esModule = true;
exports.lazyValue = lazyValue;
exports.value = value;
/* No side effect */
