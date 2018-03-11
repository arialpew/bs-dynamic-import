type importable('a) = {. "importable": 'a};

[@bs.val] external import : string => Js.Promise.t(importable('a)) = "";

let (||>) = (f, g, x) => g(f(x));

let (>>=) = (a, b) => Js.Promise.then_(b ||> Js.Promise.resolve, a);

let (>>=!) = (a, b) => Js.Promise.catch(b ||> Js.Promise.resolve, a);

let (=<<) = (a, b) => Js.Promise.then_(a ||> Js.Promise.resolve, b);

let (!=<<) = (a, b) => Js.Promise.catch(a ||> Js.Promise.resolve, b);

/* Depack module. */
let depack = x => x##importable;

/* Load one module. */
let load = fetch => fetch >>= (x => depack(x));

/* Load two module in parallel (tuple). */
let load2 = fetchs =>
  fetchs |> Js.Promise.all2 >>= (((a, b)) => (depack(a), depack(b)));

/* Load three module in parallel (tuple). */
let load3 = fetchs =>
  fetchs
  |> Js.Promise.all3
  >>= (((a, b, c)) => (depack(a), depack(b), depack(c)));

/* Load four module in parallel (tuple). */
let load4 = fetchs =>
  fetchs
  |> Js.Promise.all4
  >>= (((a, b, c, d)) => (depack(a), depack(b), depack(c), depack(d)));

/* Load five module in parallel (tuple). */
let load5 = fetchs =>
  fetchs
  |> Js.Promise.all5
  >>= (
    ((a, b, c, d, e)) => (
      depack(a),
      depack(b),
      depack(c),
      depack(d),
      depack(e)
    )
  );

/* Load six module in parallel (tuple). */
let load6 = fetchs =>
  fetchs
  |> Js.Promise.all6
  >>= (
    ((a, b, c, d, e, f)) => (
      depack(a),
      depack(b),
      depack(c),
      depack(d),
      depack(e),
      depack(f)
    )
  );
