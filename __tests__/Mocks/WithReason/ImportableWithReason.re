module type t = (module type of WithReason);

let importable: (module t) = (module WithReason);
