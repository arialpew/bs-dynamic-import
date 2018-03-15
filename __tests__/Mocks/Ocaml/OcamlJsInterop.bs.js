'use strict';

var Ramda = require("ramda");

function inc(prim) {
  return Ramda.inc(prim);
}

function toUpper(prim) {
  return Ramda.toUpper(prim);
}

exports.inc = inc;
exports.toUpper = toUpper;
/* ramda Not a pure module */
