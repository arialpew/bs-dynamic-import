open Jest;

open Expect;

open Infix;

describe("load", () => {
  testPromise("should load one module", () =>
    Loader.import("./Mocks/WithReason/ImportableWithReason.bs")
    |> Loader.load
    >>= (
      ((module AnonymousModule): (module ImportableWithReason.t)) =>
        AnonymousModule.getDumbValue() |> expect |> toMatchSnapshot
    )
    >>=! ((_) => fail("this case should not happen !"))
  );
  testPromise("should fail if module doesn't exist", () =>
    Loader.import("./Mocks/WithReason/???.bs")
    |> Loader.load
    >>= ((_) => fail("this case should not happen !"))
    >>=! (error => error |> expect |> toMatchSnapshot)
  );
});

describe("load2", () => {
  testPromise("should load two module in parallel", () =>
    Loader.load2((
      Loader.import("./Mocks/WithReason/ImportableWithReason.bs"),
      Loader.import("./Mocks/WithOcaml/ImportableWithOcaml.bs")
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
    Loader.load2((
      Loader.import("./Mocks/WithReason/ImportableWithReason.bs"),
      Loader.import("./Mocks/WithOcaml/???.bs")
    ))
    >>= ((_) => fail("this case should not happen !"))
    >>=! (error => error |> expect |> toMatchSnapshot)
  );
});
