

import * as Jest from "@glennsl/bs-jest/src/jest.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as DynamicImport from "../src/DynamicImport.bs.js";

describe("Reason", (function () {
        Jest.testPromise(/* None */0, "should work wih basic module", (function () {
                return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.resolve(import("./Mocks/Reason/ReasonBase.bs.js")), (function (X) {
                                  return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](Curry._1(X[/* lazyValue */0], /* () */0) + X[/* value */1]));
                                })), (function (x) {
                              return Jest.fail(String(x));
                            }));
              }));
        Jest.testPromise(/* None */0, "should work when using external JS with BuckleScript interop binding", (function () {
                return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.resolve(import("./Mocks/Reason/ReasonJsInterop.bs.js")), (function (X) {
                                  return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](Curry._1(X[/* inc */0], 2)));
                                })), (function (x) {
                              return Jest.fail(String(x));
                            }));
              }));
        return Jest.testPromise(/* None */0, "should work with default export", (function () {
                      return DynamicImport.$great$great$eq$bang(DynamicImport.$great$great$eq(DynamicImport.resolve(import("./Mocks/Reason/ReasonDefaultExport.bs.js")), (function (X) {
                                        return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](Curry._1(X[/* lazyValue */1], /* () */0) + (X[/* value */2] + X[/* default */0])));
                                      })), (function (x) {
                                    return Jest.fail(String(x));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
