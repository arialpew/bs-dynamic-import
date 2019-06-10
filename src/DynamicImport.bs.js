'use strict';

var Curry = require("bs-platform/lib/js/curry.js");

function $less$$great(a, b) {
  return a.then((function (param) {
                return Promise.resolve(Curry._1(b, param));
              }));
}

function $less$$bang$great(a, b) {
  return a.catch((function (param) {
                return Promise.resolve(Curry._1(b, param));
              }));
}

function $great$great$eq(a, b) {
  return a.then(Curry.__1(b));
}

function $great$great$eq$bang(a, b) {
  return a.catch(Curry.__1(b));
}

function $eq$less$less(a, b) {
  return b.then(Curry.__1(a));
}

function $bang$eq$less$less(a, b) {
  return b.catch(Curry.__1(a));
}

function depack(x) {
  if (x.propertyIsEnumerable("$$default") && x.propertyIsEnumerable("__esModule") && x.__esModule) {
    (( delete x.__esModule ));
  }
  (( delete x.$$default ));
  return Object.values(x);
}

function resolve($$fetch) {
  return $less$$great($$fetch, depack);
}

function resolve2(fetchs) {
  return $less$$great(Promise.all(fetchs), (function (param) {
                return /* tuple */[
                        depack(param[0]),
                        depack(param[1])
                      ];
              }));
}

function resolve3(fetchs) {
  return $less$$great(Promise.all(fetchs), (function (param) {
                return /* tuple */[
                        depack(param[0]),
                        depack(param[1]),
                        depack(param[2])
                      ];
              }));
}

function resolve4(fetchs) {
  return $less$$great(Promise.all(fetchs), (function (param) {
                return /* tuple */[
                        depack(param[0]),
                        depack(param[1]),
                        depack(param[2]),
                        depack(param[3])
                      ];
              }));
}

function resolve5(fetchs) {
  return $less$$great(Promise.all(fetchs), (function (param) {
                return /* tuple */[
                        depack(param[0]),
                        depack(param[1]),
                        depack(param[2]),
                        depack(param[3]),
                        depack(param[4])
                      ];
              }));
}

function resolve6(fetchs) {
  return $less$$great(Promise.all(fetchs), (function (param) {
                return /* tuple */[
                        depack(param[0]),
                        depack(param[1]),
                        depack(param[2]),
                        depack(param[3]),
                        depack(param[4]),
                        depack(param[5])
                      ];
              }));
}

exports.$less$$great = $less$$great;
exports.$less$$bang$great = $less$$bang$great;
exports.$great$great$eq = $great$great$eq;
exports.$great$great$eq$bang = $great$great$eq$bang;
exports.$eq$less$less = $eq$less$less;
exports.$bang$eq$less$less = $bang$eq$less$less;
exports.resolve = resolve;
exports.resolve2 = resolve2;
exports.resolve3 = resolve3;
exports.resolve4 = resolve4;
exports.resolve5 = resolve5;
exports.resolve6 = resolve6;
/* No side effect */
