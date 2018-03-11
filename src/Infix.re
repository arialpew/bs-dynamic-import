let (||>) = (f, g, x) => g(f(x));

let (>>=) = (a, b) => Js.Promise.then_(b ||> Js.Promise.resolve, a);

let (>>=!) = (a, b) => Js.Promise.catch(b ||> Js.Promise.resolve, a);

let (=<<) = (a, b) => Js.Promise.then_(a ||> Js.Promise.resolve, b);

let (!=<<) = (a, b) => Js.Promise.catch(a ||> Js.Promise.resolve, b);
