open Jest;

open Expect;

open DynamicImport;

describe("load", () => {
  testPromise("should load one module", () =>
    import("./Mocks/WithReason/ImportableWithReason.bs")
    |> load
    >>= (
      ((module AnonymousModule): (module ImportableWithReason.t)) =>
        AnonymousModule.getDumbValue() |> expect |> toMatchSnapshot
    )
    >>=! ((_) => fail("this case should not happen !"))
  );
  testPromise("should fail if module doesn't exist", () =>
    import("./Mocks/WithReason/???.bs")
    |> load
    >>= ((_) => fail("this case should not happen !"))
    >>=! (error => error |> expect |> toMatchSnapshot)
  );
});

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
