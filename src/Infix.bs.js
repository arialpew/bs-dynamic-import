

import * as Curry from "bs-platform/lib/es6/curry.js";

function $great$great$eq(a, b) {
  return a.then((function (param) {
                return Promise.resolve(Curry._1(b, param));
              }));
}

function $great$great$eq$bang(a, b) {
  return a.catch((function (param) {
                return Promise.resolve(Curry._1(b, param));
              }));
}

function $eq$less$less(a, b) {
  return b.then((function (param) {
                return Promise.resolve(Curry._1(a, param));
              }));
}

function $bang$eq$less$less(a, b) {
  return b.catch((function (param) {
                return Promise.resolve(Curry._1(a, param));
              }));
}

export {
  $great$great$eq ,
  $great$great$eq$bang ,
  $eq$less$less ,
  $bang$eq$less$less ,
  
}
/* No side effect */
