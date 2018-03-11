

import * as Jest from "@glennsl/bs-jest/src/jest.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Infix$BsDynamicImport from "../src/Infix.bs.js";
import * as Loader$BsDynamicImport from "../src/Loader.bs.js";

describe("Loader", (function () {
        Jest.testPromise(/* None */0, "should load one module", (function () {
                return Infix$BsDynamicImport.$great$great$eq(Loader$BsDynamicImport.load(import("./Mocks/Math/ImportableMath.bs")), (function (AnonymousModule) {
                              return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](Curry._1(AnonymousModule[/* getModuleName */0], /* () */0)));
                            }));
              }));
        return Jest.testPromise(/* None */0, "should fail if module doesn't exist", (function () {
                      return Infix$BsDynamicImport.$great$great$eq$bang(Loader$BsDynamicImport.load(import("./Mocks/Math/???.bs")), (function (error) {
                                    return Jest.Expect[/* toMatchSnapshot */16](Jest.Expect[/* expect */0](error));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
