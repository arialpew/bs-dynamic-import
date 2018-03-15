external inc : int -> int = "inc" [@@bs.module "ramda"]
external toUpper : string -> string = "toUpper" [@@bs.module "ramda"]

let inc = inc
let toUpper = toUpper
