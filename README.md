# Summary

[![Build Status](https://travis-ci.org/kMeillet/bs-dynamic-import.svg?branch=master)](https://travis-ci.org/kMeillet/bs-dynamic-import)
![NPM license](https://img.shields.io/npm/l/bs-dynamic-import.svg?style=flat)

📦🚀 BuckleScript dynamic import interop on JavaScript environment.

Provide a clear path for Reason/Ocaml module to become importable at runtime, preserve type-safety.

**Note :** This project does not target native compilation but JavaScript compilation.

* [Installation](#installation)
* [Motivation](#motivation)
  * [Common problems](#common-problems)
  * [Support](#support)
* [Example](#example)
  * [Basic example](#basic-example)
  * [Multiple module](#multiple-module)
* [API](#api)
  * [DynamicImport](#dynamicimport)
  * [Infix](#infix)
* [Common errors](#common-errors)

# Installation

```sh
npm install bs-dynamic-import --save
```

Then add it to "bsconfig.json" :

```sh
"bs-dependencies": [
 "bs-dynamic-import"
]
```

You can now use **"DynamicImport"** module.

# Motivation

I will try to explain my propose and the following pattern for dynamic import API in Reason/Ocaml.

The existing syntactic forms for JavaScript importing modules are static declarations. They accept a string literal as the module specifier, and introduce bindings into the local scope via a pre-runtime "linking" process. 

This is a great design for the 90% case, and supports important use cases such as static analysis, bundling tools, and tree shaking.

However, it's also desirable to be able to dynamically load parts of a JavaScript application at runtime. This could be because of factors only known at runtime (such as the user's language), for performance reasons (not loading code until it is likely to be used), or for robustness reasons (surviving failure to load a non-critical module). Such dynamic code-loading has a long history, especially on the web, but also in Node.js (to delay startup costs). The existing import syntax does not support such use cases ...

Truly dynamic code loading also enables advanced scenarios, such as racing multiple modules against each other and choosing the first to successfully load.

https://tc39.github.io/proposal-dynamic-import/

In Reason/Ocaml, every file is a module : file name map to module name and you can make module into module. With BuckleScript, we can compile Reason/Ocaml module to JavaScript module.

BuckleScript doesn't provide dynamic import.
 
🔥 **"bs-dynamic-import"** let you use dynamic import right now with BuckleScript.

`When BuckleScript will release dynamic import support, you should drop "bs-dynamic-import" and switch to BuckleScript syntax ; no worries, this project offers a basic API and can be replaced very quickly if needed.`

## Common problems

Some of the most common problematic patterns that were covered include :

* **Commonjs/ES6 support**. ✔️
* **Dynamic import Reason/Ocaml module**. ✔️ 
* **Dynamic import multiple module in parallel**. ✔️
* **Race module against each other**. ❌

## Support

- Server-side (Node.js) : Node.js doesn't support dynamic import, you should use [Babel](https://babeljs.io/) with ["babel-plugin-dynamic-import-node"](https://github.com/airbnb/babel-plugin-dynamic-import-node). [#example](https://github.com/kMeillet/bs-dynamic-import)

- Client-side (web) : you should use a bundler ([Webpack 4](https://webpack.js.org/) and [Parcel](https://github.com/parcel-bundler/parcel) support dynamic import with zero-configuration, Rollup require experimental flag). [#example](https://github.com/kMeillet/reason-loadable/tree/master/examples)

# Example

## Basic example

Consider a Math module and Main module :

```reason
/* Math.re */
let addOne = x => x + 1;
/* ... */
```

```reason
/* Main.re */
3 |> Math.addOne |> Js.log; /* 4 */
```

**Note :** Pipe operator **"|>"** help chaining function and avoid parenthesis ceremony.

Module are static (know at compile time). If you want to import Math dynamically (on runtime), use **"DynamicImport"** module.

```reason
/* Main.re */
module type MathType = (module type of Math);

DynamicImport.(
  import("./Math.bs.js")
  |> resolve
  |> Js.Promise.then_(((module AnonymouModule): (module MathType)) =>
      3 |> AnonymouModule.addOne |> Js.log |> Js.Promise.resolve /* 4 */
  )
);
```

**Note :** You must always import BuckleScript output (bs.js), don't try to import Reason/Ocaml file (that will not work).

1) First, we declare a module type who refer to Math module type himself.

2) We open **"DynamicImport"** module locally to avoid name collision. **"DynamicImport"** module come with multiple functions and infix operator but the most important part of the API are **"import"** and **"resolve"** function.

3) **"DynamicImport.import"** share signature with dynamic import JavaScript API : take a module path and return a Promise of module. This Promise should be passed to **"DynamicImport.resolve"** when you want to resolve module.

**Note :** when using **"DynamicImport.import"** you should provide ".bs.js" extension (or configure your bundler to recognize ".bs.js" extension as ".js" extension).

**Note :** if you import wrong module or a path who doesn't exist, compiler will not complain so be carefull about this situation when you move/rename file, like with JavaScript module.

4) After module is dynamically imported, you can use **"Js.Promise.then_"** and "repack" the anonymous module with correct module type. If you use wrong module type or forgot to provide it, you will face compiler error.

**Note :** Using **"Js.Promise.then_"** is verbose (you have to wrap result with **"Js.Promise.resolve"** every time), we provide **">>="** (then bind) operator to traverse Promise and apply your function (return value will be wrapped into Promise).

```reason
/* Main.re */
module type MathType = (module type of Math);

DynamicImport.(
  import("./Math.bs.js")
  |> resolve
  >>= (
    ((module AnonymouModule): (module MathType)) =>
      3 |> AnonymouModule.addOne |> Js.log /* 4 */
  )
);
```

🔥 Look much better !

Finally, you can catch error with **"Js.Promise.catch"** - and of course we provide **">>=!"** (catch bind) operator (return value will be wrapped into Promise).

```reason
/* Main.re */
module type MathType = (module type of Math);

DynamicImport.(
  import("./Math.bs.js")
  |> resolve
  >>= (
    ((module AnonymouModule): (module MathType)) =>
      3 |> AnonymouModule.addOne |> Js.log /* 4 */
  )
  >>=! (error => Js.log(error))
);
```

Now, how can we dynamically import JavaScript library ? Write 1:1 binding like normal way and expose what do you want.

```sh
npm install ramda --save
```

```reason
/* Ramda.re */
[@bs.module "ramda"] external inc : int => int = "inc";

let inc = inc;
```

```reason
/* Main.re */
module type RamdaType = (module type of Ramda);

DynamicImport.(
  import("./Ramda.bs.js")
  |> resolve
  >>= (
    ((module Ramda): (module RamdaType)) =>
      3 |> Ramda.inc |> Js.log /* 4 */
  )
  >>=! (error => Js.log(error))
);
```

What about default export compatibility ?

```reason
/* Math.re */
let addOne = x => x + 1;
/* ... */
let default = () => "Default export !";
```

```reason
/* Main.re */
module type MathType = (module type of Math);

DynamicImport.(
  import("./Math.bs.js")
  |> resolve
  >>= (
    ((module Math): (module MathType)) =>
      Ramda.default() |> Js.log /* "Default export !" */
  )
  >>=! (error => Js.log(error))
);
```

## Multiple module

If you want to import multiple module in parallel, there is multiple resolve function who work with tuple :

- DynamicImport.resolve2
- DynamicImport.resolve3
- DynamicImport.resolve4
- DynamicImport.resolve5
- DynamicImport.resolve6

```reason
/* Main.re */
module type MathType = (module type of Math);
module type CurrencyType = (module type of Currency);

DynamicImport.(
  resolve2((
    import("./Math.bs.js"),
    import("./Currency.bs.js")
  ))
  >>= (
    (
      (
        (module Math): (module MathType),
        (module Currency): (module CurrencyType)
      )
    ) =>
      3
      |> Math.addOne
      |> Currency.toDollar
      |> Js.log
  )
  >>=! (error => Js.log(error))
);
```

# API

## DynamicImport

[![API](http://image.noelshack.com/fichiers/2018/10/7/1520802841-code.png)](http://image.noelshack.com/fichiers/2018/10/7/1520802841-code.png)

#### type importable('a)

Dynamic module type.

#### import: string => Js.Promise.t(importable('a))

Import dynamic module.

#### resolve: Js.Promise.t(importable('a)) => Js.Promise.t('a)

Resolve dynamic module.

There is resolve2, resolve3, resolve4, resolve5, resolve6 that do the same thing with tuple for parallel import.

## Infix

We expose 4 infix operator for better experience :

- \>>= (Promise then bind).
- =<< (Reverse Promise then bind).
- \>>=! (Promise catch bind).
- !=<< (Reverse Promise catch bind).

Underlying, these operator work with any **"Js.Promise.t"**.

# Common errors

#### "The signature for this packaged module couldn't be inferred."

This error mean you forgot to provide module type on resolved module.

❌ Wrong :

```reason
/* Main.re */
DynamicImport.(
  import("./Math.bs.js")
  |> resolve
  >>= (
    ((module Math)) => /* Signature missing ! */
      3 |> Math.addOne |> Js.log /* 4 */
  )
);
```

✔️ Good :

```reason
/* Main.re */
module type MathType = (module type of Math); /* Signature */

DynamicImport.(
  import("./Math.bs.js")
  |> resolve
  >>= (
    ((module Math): (module MathType)) => /* Provide signature */
      3 |> Math.addOne |> Js.log /* 4 */
  )
);
```

#### "The value >>= can't be found."

You should use local or global open to have **"DynamicImport"** module in scope.

❌ Wrong :

```reason
/* Main.re */
module type MathType = (module type of Math);

/* Where is DynamicImport ? */
import("./Math.bs.js")
|> resolve
>>= (
  ((module Math): (module MathType)) =>
    3 |> Math.addOne |> Js.log /* 4 */
);
```

✔️ Good :

```reason
/* Main.re */
module type MathType = (module type of Math);

/* Local open */
DynamicImport.(
  import("./Math.bs.js")
  |> resolve
  >>= (
    ((module Math): (module MathType)) =>
    3 |> Math.addOne |> Js.log /* 4 */
  )
);
```

```reason
/* Main.re */
/* Global open */
open DynamicImport;

module type MathType = (module type of Math);

import("./Math.bs.js")
|> resolve
>>= (
  ((module Math): (module MathType)) =>
    3 |> Math.addOne |> Js.log /* 4 */
):
```

#### "JavaScript runtime type error (cannot find length, 0 is not a function)" (nightmare !)

Compiler can not verify that you have imported the right module or check if module path is correct.

That's your responsability and you should be cautious about this because it's very error prone.

Always import file that will be compiled by BuckleScript (".bs.js" file), never import Reason/Ocaml file.

You can catch any error with **">>=!"** operator (catch bind) and apply custom logic if something fail on runtime.

❌ Wrong :

```reason
/* Main.re */
module type MathType = (module type of Math);

DynamicImport.(
  import("./Mat.bs.js") /* Bad path, file is missing */
  |> resolve
  >>= (
    ((module Math): (module MathType)) =>
      3 |> Math.addOne |> Js.log /* 4 */
  )
);
```

```reason
/* Main.re */
module type MathType = (module type of Math);

DynamicImport.(
  import("./Math.re") /* Can't, Reason file */
  |> resolve
  >>= (
    ((module Math): (module MathType)) =>
      3 |> Math.addOne |> Js.log /* 4 */
  )
);
```

```reason
/* Main.re */
module type MathType = (module type of Math);

DynamicImport.(
  import("./Math.js") /* Can't, non-BuckleScript output */
  |> resolve
  >>= (
    ((module Math): (module MathType)) =>
      3 |> Math.addOne |> Js.log /* 4 */
  )
);
```

```reason
/* Main.re */
module type MathType = (module type of Math);

DynamicImport.(
  import("./Math.ml") /* Can't, Ocaml file */
  |> resolve
  >>= (
    ((module Math): (module MathType)) =>
      3 |> Math.addOne |> Js.log /* 4 */
  )
);

✔️ Good :

```reason
/* Main.re */
module type MathType = (module type of Math);

DynamicImport.(
  import("./Math.bs.js") /* Can, BuckleScript output from Reason/Ocaml module */
  |> resolve
  >>= (
    ((module Math): (module MathType)) =>
      3 |> Math.addOne |> Js.log /* 4 */
  )
  >>=! ((_error) => Js.log("Something goes wrong, reloading ..."))
);
```

```reason
/* Main.re */
module type BsMathType = (module type of BsMath);

DynamicImport.(
  import("bs-math") /* Can, BuckleScript output from Reason/Ocaml module */
  |> resolve
  >>= (
    ((module BsMath): (module BsMathType)) =>
      3 |> BsMath.sqrt |> Js.log /* 1.73 */
  )
  >>=! ((_error) => Js.log("Something goes wrong, reloading ..."))
);
```
