# Summary

[![Build Status](https://travis-ci.org/kMeillet/bs-dynamic-import.svg?branch=master)](https://travis-ci.org/kMeillet/bs-dynamic-import)

📦🚀 BuckleScript dynamic import interopt on JavaScript environment.

Provide a clear path for Reason/Ocaml module to become importable at JavaScript runtime with type-safety.

* [Installation](#installation)
* [Motivation](#motivation)
  * [Common problems](#common-problems)
* [Example](#example)
  * [Basic example](#basic-example)
  * [Multiple module](#multiple-module)
* [API](#api)
  * [Loader](#loader)
  * [Infix](#infix)
* [Alternatives](#alternatives)
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

The existing syntactic forms for JavaScript importing modules are static declarations. They accept a string literal as the module specifier, and introduce bindings into the local scope via a pre-runtime "linking" process. This is a great design for the 90% case, and supports important use cases such as static analysis, bundling tools, and tree shaking.

However, it's also desirable to be able to dynamically load parts of a JavaScript application at runtime. This could be because of factors only known at runtime (such as the user's language), for performance reasons (not loading code until it is likely to be used), or for robustness reasons (surviving failure to load a non-critical module). Such dynamic code-loading has a long history, especially on the web, but also in Node.js (to delay startup costs). The existing import syntax does not support such use cases.

Truly dynamic code loading also enables advanced scenarios, such as racing multiple modules against each other and choosing the first to successfully load.

https://tc39.github.io/proposal-dynamic-import/

This project try to solve this problem when working with Reason/Ocaml (source) --> JavaScript (output) with BuckleScript (bs-platform), because there's no dynamic import in BuckleScript API for the moment.

This project don't aim to target native compilation.

## Common problems

Some of the most common problematic patterns that were covered include :

* **Interopt with Reason/Ocaml module**. ✔️
* **Interopt with JavaScript module**. ❌
* **Dynamic import JavaScript `node_modules` library**. ❌
* **Race module against each other**. ❌

# Example

## Basic example

In Reason/Ocaml, every file is a module : file name map to module name and you can make module into module.

With BuckleScript (bs-platform), we can compile Reason/Ocaml module to JavaScript module.

With a bundler (Parcel, Webpack, ...), we can "pack" JavaScript module to create a production-ready bundle with dead-code elimination (a.k.a threeshaking), minification, module concatenation, ...

When code increase in complexity (more module, more dependency, more assets, ...) bundle size will growth and it's not ideal to ship the whole bundle, especially for front-end application.

JavaScript have [dynamic import proposal](https://github.com/tc39/proposal-dynamic-import) and most bundler support this feature, but we can't use it easily in Reason/Ocaml ; modules are at a different "layer" of language than the rest (functions, let bindings, data structures, etc.).

I will try to explain my propose and the following pattern for dynamic import API in Reason/Ocaml.

Consider a Math module and Main module :

```reason
/* Math.re */
let addOne = x => x + 1;
let subOne = x => x - 1;
/* ... */
```

```reason
/* Main.re */
Js.log(Math.addOne(3)); /* 4 */
```

If we want to import Math dynamically instead of staticly, we have to create a new file who reference Math module interface and Math module into "importable" let declaration, that's how the magic work (thanks to [@rickyvetter](https://github.com/rickyvetter)).

```reason
/* ImportableMath.re */
module type t = (module type of Math);

let importable: t = (module Math);
```

This pattern is exactly the same for all dynamic module and you can choose any file name ("ImportableModule" is a good practice).

- module type t = interface of the module.
- let importable = refer to module himself.

At any code level, you can now do this :

```reason
/* Main.re */
DynamicImport.(
  import("./ImportableMath.bs")
  |> load
  >>= (
    ((module Math): (module ImportableMath.t)) =>
      Js.log(Math.addOne(3)) /* 4 */
  )
):
```

1) "DynamicImport.import" take a module path (same as JavaScript API) and return a Promise of importable module.

2) "DynamicImport.load" take a Promise of importable module and return a Promise of module.

3) After module is dynamically loaded, you can use >>= (bind) operator to traverse the Promise and "repack" the anonymous module with correct interface. You can use any module name (think as anonymous module).

4) Be carefull, if you use wrong interface or don't provide it, you will face compiler error. For example, "ImportableMath.t" resolve the anonymous module (named "Math" in this example for clarity) with correct interface.

**Note :** if you import wrong module or a path who doesn't exist, compiler will not complain but bundler will.

**Note :** when using "DynamicImport.import" you should provide the ".bs" extension (or configure your bundler to recognize with ".bs.js" extension as JavaScript module).

## Multiple module

If you want to import multiple module in parallel, there is multiple load function who work with tuple :

- DynamicImport.load2
- DynamicImport.load3
- DynamicImport.load4
- DynamicImport.load5
- DynamicImport.load6

We expose few infix operator for better DX :

- \\>>= (Promise then bind).
- =<< (Reverse Promise then bind).
- \\>>=! (Promise catch bind).
- =<< (Reverse Promise catch bind).

# API

## Create dynamic module

To create a dynamic version of a static module X, you need to create new file with this pattern :

```reason
/* ImportableX.re */
module type t = (module type of X);

let importable: t = (module X);
```

## Loader

[![API](http://image.noelshack.com/fichiers/2018/10/7/1520788049-code.png)](http://image.noelshack.com/fichiers/2018/10/7/1520788049-code.png)

#### type importable('a)

Represent dynamic module.

#### import: string => Js.Promise.t(importable('a))

Import dynamic module via path.

#### load: Js.Promise.t(importable('a)) => Js.Promise.t('a)

Resolve dynamic module.

There is load2, load3, load4, load5, load6 that do the same thing with tuple of dynamic module, for parallel import.

## Infix

[![API](http://image.noelshack.com/fichiers/2018/10/7/1520788211-code.png)](http://image.noelshack.com/fichiers/2018/10/7/1520788211-code.png)

# Alternatives

- Bs.raw.
- Obj.magic.

# Common errors

#### "The signature for this packaged module couldn't be inferred."

This error mean you forgot to provide interface on anonymous module.

❌ Wrong :

```reason
/* Main.re */
DynamicImport.(
  import("./ImportableMath.bs")
  |> load
  >>= (
    ((module Math)) =>
      Js.log(Math.addOne(3)) /* 4 */
  )
):
```

✔️ Good :

```reason
/* Main.re */
DynamicImport.(
  import("./ImportableMath.bs")
  |> load
  >>= (
    ((module Math): (module ImportableMath.t)) =>
      Js.log(Math.addOne(3)) /* 4 */
  )
):
```