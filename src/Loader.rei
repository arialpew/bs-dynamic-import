type importable('a);

exception ModuleNotLoadable;

exception ModuleNotFound;

[@bs.val] external import : string => Js.Promise.t(importable('a)) = "";

let depack: importable('a) => 'a;

let load: Js.Promise.t(importable('a)) => Js.Promise.t('a);

let load2:
  ((Js.Promise.t(importable('a)), Js.Promise.t(importable('b)))) =>
  Js.Promise.t(('a, 'b));

let load3:
  (
    (
      Js.Promise.t(importable('a)),
      Js.Promise.t(importable('b)),
      Js.Promise.t(importable('c))
    )
  ) =>
  Js.Promise.t(('a, 'b, 'c));

let load4:
  (
    (
      Js.Promise.t(importable('a)),
      Js.Promise.t(importable('b)),
      Js.Promise.t(importable('c)),
      Js.Promise.t(importable('d))
    )
  ) =>
  Js.Promise.t(('a, 'b, 'c, 'd));

let load5:
  (
    (
      Js.Promise.t(importable('a)),
      Js.Promise.t(importable('b)),
      Js.Promise.t(importable('c)),
      Js.Promise.t(importable('d)),
      Js.Promise.t(importable('e))
    )
  ) =>
  Js.Promise.t(('a, 'b, 'c, 'd, 'e));

let load6:
  (
    (
      Js.Promise.t(importable('a)),
      Js.Promise.t(importable('b)),
      Js.Promise.t(importable('c)),
      Js.Promise.t(importable('d)),
      Js.Promise.t(importable('e)),
      Js.Promise.t(importable('f))
    )
  ) =>
  Js.Promise.t(('a, 'b, 'c, 'd, 'e, 'f));
