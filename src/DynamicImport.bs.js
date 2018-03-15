

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

var depack = (
  function(x) {
    /**
     * Convert regular Common.js/ES module into BuckleScript JavaScript module (array of value).
     * We have to care about ordering, array mean index and BuckleScript will pick the right index to call the right function.
     *
     * When Reason/Ocaml module use a "let default" declaration, that will produce this output :
     *
     * --> COMMONJS
     * exports.lazyValue = lazyValue;
     * exports.value = value;
     * exports.$$default = $$default;
     * exports.default = $$default;
     * exports.__esModule = true;
     *
     * --> ESM
     * export { lazyValue, value $$default, $$default as default };
     *
     * Without default declaration, we get this :
     *
     * --> COMMONJS
     * exports.lazyValue = lazyValue,
     * exports.value = value;
     *
     * --> ESM
     * export { lazyValue, value };
     *
     * -----------------------------------------------------------------------
     * => __esModule is provided on Common.js only if default export is used. Enumerable property.
     * => __esModule is flagged on ESM if you use compiler like Babel but thanks god, not enumerable property.
     * => We should remove "$$default" key to preserve module order on Common.js/ESM, "default" do the same job.
     * => We should remove "__esModule" key to preserve module order on Common.js because it's enumerable and that should not.
     * See : https://github.com/BuckleScript/bucklescript/issues/1987
     *
    */

    if (x.__esModule && x.$$default && x.propertyIsEnumerable('__esModule')) {
      delete x.__esModule;
    }

    delete x.$$default;

    return Object.values(x);
  }
);

function resolve(fetch) {
  return $great$great$eq(fetch, Curry.__1(depack));
}

function resolve2(fetchs) {
  return $great$great$eq(Promise.all(fetchs), (function (param) {
                return /* tuple */[
                        Curry._1(depack, param[0]),
                        Curry._1(depack, param[1])
                      ];
              }));
}

export {
  $great$great$eq ,
  $great$great$eq$bang ,
  $eq$less$less ,
  $bang$eq$less$less ,
  resolve ,
  resolve2 ,
  
}
/* depack Not a pure module */
