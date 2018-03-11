module type t = (module type of Math);

let importable: (module t) = (module Math);
