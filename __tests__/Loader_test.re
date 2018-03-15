open Jest;

open Expect;

open DynamicImport;

describe("Reason", () => {
  testPromise("should work wih basic module", () =>
    import("./Mocks/Reason/ReasonBase.bs.js")
    |> resolve
    >>= (
      ((module X): (module Importable.ReasonBase)) =>
        X.lazyValue() ++ X.value |> expect |> toMatchSnapshot
    )
    >>=! (x => fail(Js.String.make(x)))
  );
  testPromise(
    "should work when using external JS with BuckleScript interop binding", () =>
    import("./Mocks/Reason/ReasonJsInterop.bs.js")
    |> resolve
    >>= (
      ((module X): (module Importable.ReasonJsInterop)) =>
        X.inc(2) |> expect |> toMatchSnapshot
    )
    >>=! (x => fail(Js.String.make(x)))
  );
  testPromise("should work with default export", () =>
    import("./Mocks/Reason/ReasonDefaultExport.bs.js")
    |> resolve
    >>= (
      ((module X): (module Importable.ReasonDefaultExport)) =>
        X.lazyValue() ++ X.value ++ X.default |> expect |> toMatchSnapshot
    )
    >>=! (x => fail(Js.String.make(x)))
  );
});
/*

   testPromise("should load one module 2", () =>
   import("./Mocks/WithJs/WithJs")
   |> load
   >>= (
     ((module AnonymousModule: Importable.WithJs)) =>
       AnonymousModule.getValue() |> expect |> toMatchSnapshot
   )
   >>=! ((err) => fail(Js.String.make(err)))
 );
 testPromise("should load one module 3", () =>
 import("./Mocks/WithJs/WithJsValue")
 |> load
 >>= (
   ((module AnonymousModule: Importable.WithJsValue)) =>
     AnonymousModule.x |> expect |> toMatchSnapshot
 )
 >>=! ((err) => fail(Js.String.make(err)))
 );
 testPromise("should load one module 3", () =>
 import("./Mocks/WithJs/WithDefaultExport")
 |> load
 >>= (
   ((module AnonymousModule: Importable.WithDefaultExport)) =>
     AnonymousModule.getValue() |> expect |> toMatchSnapshot
 )
 >>=! ((err) => fail(Js.String.make(err)))
 );
   testPromise("should fail if module doesn't exist", () =>
     import("./Mocks/WithReason/???.bs")
     |> load
     >>= ((_) => fail("this case should not happen !"))
     >>=! (error => error |> expect |> toMatchSnapshot)
   );
   */
/*
 describe("load2", () => {
   testPromise("should load two module in parallel", () =>
     load2((
       import("./Mocks/WithReason/ImportableWithReason.bs"),
       import("./Mocks/WithOcaml/ImportableWithOcaml.bs")
     ))
     >>= (
       (
         (
           (module AnonymousModule): (module ImportableWithReason.t),
           (module AnonymousModule2): (module ImportableWithOcaml.t)
         )
       ) =>
         AnonymousModule.getDumbValue()
         |> AnonymousModule2.multByTwo
         |> AnonymousModule2.addOne
         |> expect
         |> toMatchSnapshot
     )
     >>=! ((_) => fail("this case should not happen !"))
   );
   testPromise("should fail if at least one module doesn't exist", () =>
     load2((
       import("./Mocks/WithReason/ImportableWithReason.bs"),
       import("./Mocks/WithOcaml/???.bs")
     ))
     >>= ((_) => fail("this case should not happen !"))
     >>=! (error => error |> expect |> toMatchSnapshot)
   );
 });
 */
