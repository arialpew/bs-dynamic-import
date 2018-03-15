'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var Curry = require("bs-platform/lib/js/curry.js");
var DynamicImport = require("../src/DynamicImport.bs.js");

describe("Reason", (function () {
        Jest.testPromise(/* None */0, "should work wih basic module export", (function () {
                return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.resolve(import("./Mocks/Reason/ReasonBase.bs.js")), (function (X) {
                                  return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](Curry._1(X[/* lazyValue */0], /* () */0) + X[/* value */1]));
                                })), (function () {
                              return Jest.fail("this case should not happen !");
                            }));
              }));
        Jest.testPromise(/* None */0, "should work with BuckleScript interop binding export", (function () {
                return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.resolve(import("./Mocks/Reason/ReasonJsInterop.bs.js")), (function (X) {
                                  return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](Curry._1(X[/* inc */0], 2)));
                                })), (function () {
                              return Jest.fail("this case should not happen !");
                            }));
              }));
        Jest.testPromise(/* None */0, "should work with default export", (function () {
                return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.resolve(import("./Mocks/Reason/ReasonDefaultExport.bs.js")), (function (X) {
                                  return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](Curry._1(X[/* lazyValue */1], /* () */0) + (X[/* value */2] + X[/* default */0])));
                                })), (function () {
                              return Jest.fail("this case should not happen !");
                            }));
              }));
        Jest.testPromise(/* None */0, "should resolve two module in parallel", (function () {
                return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.resolve2(/* tuple */[
                                    import("./Mocks/Reason/ReasonBase.bs.js"),
                                    import("./Mocks/Reason/ReasonJsInterop.bs.js")
                                  ]), (function (param) {
                                  var X = param[0];
                                  return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](Curry._1(param[1][/* toUpper */1], Curry._1(X[/* lazyValue */0], /* () */0) + X[/* value */1])));
                                })), (function () {
                              return Jest.fail("this case should not happen !");
                            }));
              }));
        return Jest.testPromise(/* None */0, "should fail if at least one module doesn't resolve", (function () {
                      return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.resolve2(/* tuple */[
                                          import("./Mocks/Reason/ReasonBase.bs.js"),
                                          import("./Mocks/Reason/???.bs.js")
                                        ]), (function () {
                                        return Jest.fail("this case should not happen !");
                                      })), (function (error) {
                                    return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](error));
                                  }));
                    }));
      }));

describe("Ocaml", (function () {
        Jest.testPromise(/* None */0, "should work wih basic module export", (function () {
                return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.resolve(import("./Mocks/Ocaml/OcamlBase.bs.js")), (function (X) {
                                  return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](Curry._1(X[/* lazyValue */0], /* () */0) + X[/* value */1]));
                                })), (function () {
                              return Jest.fail("this case should not happen !");
                            }));
              }));
        Jest.testPromise(/* None */0, "should work with BuckleScript interop binding export", (function () {
                return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.resolve(import("./Mocks/Ocaml/OcamlJsInterop.bs.js")), (function (X) {
                                  return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](Curry._1(X[/* inc */0], 2)));
                                })), (function () {
                              return Jest.fail("this case should not happen !");
                            }));
              }));
        Jest.testPromise(/* None */0, "should work with default export", (function () {
                return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.resolve(import("./Mocks/Ocaml/OcamlDefaultExport.bs.js")), (function (X) {
                                  return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](Curry._1(X[/* lazyValue */1], /* () */0) + (X[/* value */2] + X[/* default */0])));
                                })), (function () {
                              return Jest.fail("this case should not happen !");
                            }));
              }));
        Jest.testPromise(/* None */0, "should resolve two module in parallel", (function () {
                return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.resolve2(/* tuple */[
                                    import("./Mocks/Ocaml/OcamlBase.bs.js"),
                                    import("./Mocks/Ocaml/OcamlJsInterop.bs.js")
                                  ]), (function (param) {
                                  var X = param[0];
                                  return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](Curry._1(param[1][/* toUpper */1], Curry._1(X[/* lazyValue */0], /* () */0) + X[/* value */1])));
                                })), (function () {
                              return Jest.fail("this case should not happen !");
                            }));
              }));
        return Jest.testPromise(/* None */0, "should fail if at least one module doesn't resolve", (function () {
                      return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.resolve2(/* tuple */[
                                          import("./Mocks/Ocaml/OcamlBase.bs.js"),
                                          import("./Mocks/Ocaml/???.bs.js")
                                        ]), (function () {
                                        return Jest.fail("this case should not happen !");
                                      })), (function (error) {
                                    return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](error));
                                  }));
                    }));
      }));

/*  Not a pure module */
