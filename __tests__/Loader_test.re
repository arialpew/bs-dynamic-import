open Jest;

open Expect;

open DynamicImport;

describe("Reason", () => {
  testPromise("should work wih basic module export", () =>
    import("./Mocks/Reason/ReasonBase.bs.js")
    |> resolve
    >>= (
      ((module X): (module Importable.ReasonBase)) =>
        X.lazyValue() ++ X.value |> expect |> toMatchSnapshot
    )
    >>=! ((_) => fail("this case should not happen !"))
  );
  testPromise("should work with BuckleScript interop binding export", () =>
    import("./Mocks/Reason/ReasonJsInterop.bs.js")
    |> resolve
    >>= (
      ((module X): (module Importable.ReasonJsInterop)) =>
        X.inc(2) |> expect |> toMatchSnapshot
    )
    >>=! ((_) => fail("this case should not happen !"))
  );
  testPromise("should work with default export", () =>
    import("./Mocks/Reason/ReasonDefaultExport.bs.js")
    |> resolve
    >>= (
      ((module X): (module Importable.ReasonDefaultExport)) =>
        X.lazyValue() ++ X.value ++ X.default |> expect |> toMatchSnapshot
    )
    >>=! ((_) => fail("this case should not happen !"))
  );
  testPromise("should resolve two module in parallel", () =>
    (
      import("./Mocks/Reason/ReasonBase.bs.js"),
      import("./Mocks/Reason/ReasonJsInterop.bs.js")
    )
    |> resolve2
    >>= (
      (
        (
          (module X): (module Importable.ReasonBase),
          (module Y): (module Importable.ReasonJsInterop)
        )
      ) =>
        X.lazyValue() ++ X.value |> Y.toUpper |> expect |> toMatchSnapshot
    )
    >>=! ((_) => fail("this case should not happen !"))
  );
  testPromise("should fail if at least one module doesn't resolve", () =>
    (
      import("./Mocks/Reason/ReasonBase.bs.js"),
      import("./Mocks/Reason/???.bs.js")
    )
    |> resolve2
    >>= ((_) => fail("this case should not happen !"))
    >>=! (error => error |> expect |> toMatchSnapshot)
  );
});

describe("Ocaml", () => {
  testPromise("should work wih basic module export", () =>
    import("./Mocks/Ocaml/OcamlBase.bs.js")
    |> resolve
    >>= (
      ((module X): (module Importable.OcamlBase)) =>
        X.lazyValue() ++ X.value |> expect |> toMatchSnapshot
    )
    >>=! ((_) => fail("this case should not happen !"))
  );
  testPromise("should work with BuckleScript interop binding export", () =>
    import("./Mocks/Ocaml/OcamlJsInterop.bs.js")
    |> resolve
    >>= (
      ((module X): (module Importable.OcamlJsInterop)) =>
        X.inc(2) |> expect |> toMatchSnapshot
    )
    >>=! ((_) => fail("this case should not happen !"))
  );
  testPromise("should work with default export", () =>
    import("./Mocks/Ocaml/OcamlDefaultExport.bs.js")
    |> resolve
    >>= (
      ((module X): (module Importable.OcamlDefaultExport)) =>
        X.lazyValue() ++ X.value ++ X.default |> expect |> toMatchSnapshot
    )
    >>=! ((_) => fail("this case should not happen !"))
  );
  testPromise("should resolve two module in parallel", () =>
    (
      import("./Mocks/Ocaml/OcamlBase.bs.js"),
      import("./Mocks/Ocaml/OcamlJsInterop.bs.js")
    )
    |> resolve2
    >>= (
      (
        (
          (module X): (module Importable.OcamlBase),
          (module Y): (module Importable.OcamlJsInterop)
        )
      ) =>
        X.lazyValue() ++ X.value |> Y.toUpper |> expect |> toMatchSnapshot
    )
    >>=! ((_) => fail("this case should not happen !"))
  );
  testPromise("should fail if at least one module doesn't resolve", () =>
    (
      import("./Mocks/Ocaml/OcamlBase.bs.js"),
      import("./Mocks/Ocaml/???.bs.js")
    )
    |> resolve2
    >>= ((_) => fail("this case should not happen !"))
    >>=! (error => error |> expect |> toMatchSnapshot)
  );
});
