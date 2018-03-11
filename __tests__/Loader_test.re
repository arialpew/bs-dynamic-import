open Jest;

open Expect;

open Infix;

describe("Loader", () => {
  testPromise("should load one module", () =>
    Loader.import("./Mocks/Math/ImportableMath.bs")
    |> Loader.load
    >>= (
      ((module AnonymousModule): (module ImportableMath.t)) =>
        AnonymousModule.getModuleName() |> expect |> toMatchSnapshot
    )
  );
  testPromise("should fail if module doesn't exist", () =>
    Loader.import("./Mocks/Math/???.bs")
    |> Loader.load
    >>=! (error => error |> expect |> toMatchSnapshot)
  );
});
