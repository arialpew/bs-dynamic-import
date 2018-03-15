type importable('a) = {. "__esModule": bool};

[@bs.val] external import : string => Js.Promise.t(importable('a)) = "";

let (||>) = (f, g, x) => g(f(x));

let (>>=) = (a, b) => Js.Promise.then_(b ||> Js.Promise.resolve, a);

let (>>=!) = (a, b) => Js.Promise.catch(b ||> Js.Promise.resolve, a);

let (=<<) = (a, b) => Js.Promise.then_(a ||> Js.Promise.resolve, b);

let (!=<<) = (a, b) => Js.Promise.catch(a ||> Js.Promise.resolve, b);

/* Depack module. */
let depack: importable('a) => 'b = [%raw
  {|
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
|}
];

/* Resolve one module. */
let resolve = fetch => fetch >>= (x => depack(x));

/* Resolve two module in parallel (tuple). */
let resolve2 = fetchs =>
  fetchs |> Js.Promise.all2 >>= (((a, b)) => (depack(a), depack(b)));
