type importable('a);

[@bs.val] external import : string => Js.Promise.t(importable('a)) = "";

let (>>=): (Js.Promise.t('a), 'a => 'b) => Js.Promise.t('b);

let (>>=!): (Js.Promise.t('a), Js.Promise.error => 'a) => Js.Promise.t('a);

let (=<<): ('a => 'b, Js.Promise.t('a)) => Js.Promise.t('b);

let (!=<<): (Js.Promise.error => 'a, Js.Promise.t('a)) => Js.Promise.t('a);

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
