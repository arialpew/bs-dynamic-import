

import * as Jest from "@glennsl/bs-jest/src/jest.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as DynamicImport from "../src/DynamicImport.bs.js";

describe("load", (function () {
        Jest.testPromise(/* None */0, "should load one module", (function () {
                return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.load(import("./Mocks/WithReason/ImportableWithReason.bs")), (function (AnonymousModule) {
                                  return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](Curry._1(AnonymousModule[/* getDumbValue */0], /* () */0)));
                                })), (function () {
                              return Jest.fail("this case should not happen !");
                            }));
              }));
        return Jest.testPromise(/* None */0, "should fail if module doesn't exist", (function () {
                      return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.load(import("./Mocks/WithReason/???.bs")), (function () {
                                        return Jest.fail("this case should not happen !");
                                      })), (function (error) {
                                    return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](error));
                                  }));
                    }));
      }));

describe("load2", (function () {
        Jest.testPromise(/* None */0, "should load two module in parallel", (function () {
                return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.load2(/* tuple */[
                                    import("./Mocks/WithReason/ImportableWithReason.bs"),
                                    import("./Mocks/WithOcaml/ImportableWithOcaml.bs")
                                  ]), (function (param) {
                                  var AnonymousModule2 = param[1];
                                  return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](Curry._1(AnonymousModule2[/* addOne */0], Curry._1(AnonymousModule2[/* multByTwo */1], Curry._1(param[0][/* getDumbValue */0], /* () */0)))));
                                })), (function () {
                              return Jest.fail("this case should not happen !");
                            }));
              }));
        return Jest.testPromise(/* None */0, "should fail if at least one module doesn't exist", (function () {
                      return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.load2(/* tuple */[
                                          import("./Mocks/WithReason/ImportableWithReason.bs"),
                                          import("./Mocks/WithOcaml/???.bs")
                                        ]), (function () {
                                        return Jest.fail("this case should not happen !");
                                      })), (function (error) {
                                    return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](error));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
