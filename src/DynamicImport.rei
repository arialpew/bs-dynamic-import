type importable('a);

[@bs.val] external import : string => Js.Promise.t(importable('a)) = "";

let (>>=): (Js.Promise.t('a), 'a => 'b) => Js.Promise.t('b);

let (>>=!): (Js.Promise.t('a), Js.Promise.error => 'a) => Js.Promise.t('a);

let (=<<): ('a => 'b, Js.Promise.t('a)) => Js.Promise.t('b);

let (!=<<): (Js.Promise.error => 'a, Js.Promise.t('a)) => Js.Promise.t('a);

let resolve: Js.Promise.t(importable('a)) => Js.Promise.t('a);

let resolve2:
  ((Js.Promise.t(importable('a)), Js.Promise.t(importable('b)))) =>
  Js.Promise.t(('a, 'b));
