

import * as Caml_exceptions from "bs-platform/lib/es6/caml_exceptions.js";
import * as Infix$BsDynamicImport from "./Infix.bs.js";

var ModuleNotLoadable = Caml_exceptions.create("Loader-BsDynamicImport.ModuleNotLoadable");

var ModuleNotFound = Caml_exceptions.create("Loader-BsDynamicImport.ModuleNotFound");

function depack(x) {
  return x.importable;
}

function load(fetch) {
  return Infix$BsDynamicImport.$great$great$eq(fetch, (function (x) {
                return x.importable;
              }));
}

function load2(fetchs) {
  return Infix$BsDynamicImport.$great$great$eq(Promise.all(fetchs), (function (param) {
                return /* tuple */[
                        param[0].importable,
                        param[1].importable
                      ];
              }));
}

function load3(fetchs) {
  return Infix$BsDynamicImport.$great$great$eq(Promise.all(fetchs), (function (param) {
                return /* tuple */[
                        param[0].importable,
                        param[1].importable,
                        param[2].importable
                      ];
              }));
}

function load4(fetchs) {
  return Infix$BsDynamicImport.$great$great$eq(Promise.all(fetchs), (function (param) {
                return /* tuple */[
                        param[0].importable,
                        param[1].importable,
                        param[2].importable,
                        param[3].importable
                      ];
              }));
}

function load5(fetchs) {
  return Infix$BsDynamicImport.$great$great$eq(Promise.all(fetchs), (function (param) {
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
  return Infix$BsDynamicImport.$great$great$eq(Promise.all(fetchs), (function (param) {
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
  ModuleNotLoadable ,
  ModuleNotFound ,
  depack ,
  load ,
  load2 ,
  load3 ,
  load4 ,
  load5 ,
  load6 ,
  
}
/* No side effect */
