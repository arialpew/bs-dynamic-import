module type t  = module type of WithOcaml

let importable: (module t) = (module WithOcaml)