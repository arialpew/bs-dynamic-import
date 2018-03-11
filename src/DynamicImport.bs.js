

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

function load(fetch) {
  return $great$great$eq(fetch, (function (x) {
                return x.importable;
              }));
}

function load2(fetchs) {
  return $great$great$eq(Promise.all(fetchs), (function (param) {
                return /* tuple */[
                        param[0].importable,
                        param[1].importable
                      ];
              }));
}

function load3(fetchs) {
  return $great$great$eq(Promise.all(fetchs), (function (param) {
                return /* tuple */[
                        param[0].importable,
                        param[1].importable,
                        param[2].importable
                      ];
              }));
}

function load4(fetchs) {
  return $great$great$eq(Promise.all(fetchs), (function (param) {
                return /* tuple */[
                        param[0].importable,
                        param[1].importable,
                        param[2].importable,
                        param[3].importable
                      ];
              }));
}

function load5(fetchs) {
  return $great$great$eq(Promise.all(fetchs), (function (param) {
                return /* tuple */[
                        param[0].importable,
                        param[1].importable,
                        param[2].importable,
                        param[3].importable,
                        param[4].importable
                      ];
              }));
}

function load6(fetchs) {
  return $great$great$eq(Promise.all(fetchs), (function (param) {
                return /* tuple */[
                        param[0].importable,
                        param[1].importable,
                        param[2].importable,
                        param[3].importable,
                        param[4].importable,
                        param[5].importable
                      ];
              }));
}

export {
  $great$great$eq ,
  $great$great$eq$bang ,
  $eq$less$less ,
  $bang$eq$less$less ,
  load ,
  load2 ,
  load3 ,
  load4 ,
  load5 ,
  load6 ,
  
}
/* No side effect */
