// 04 MINILANG: write the type checker
// Lecture 2, slides 19-22. In the lecture YOU were the type checker. Now you write it.
// One typing rule = one  case  in  check() .
// Three rules are done (T-Int, T-Var, T-Gt). You write T-Str, T-Add and T-If.
//
// GOAL : 0 red underlines AND every line in the Logs tab says PASS.

// ---- Abstract syntax: an expression is exactly one of these cases ------------------
type Expr =
  | { kind: "int"; value: number }                        // 5
  | { kind: "str"; value: string }                        // "!"
  | { kind: "var"; name: string }                         // x
  | { kind: "add"; left: Expr; right: Expr }              // e1 + e2
  | { kind: "gt"; left: Expr; right: Expr }               // e1 > e2
  | { kind: "if"; cond: Expr; then: Expr; else: Expr };   // if c then e1 else e2

type Type = "int" | "string" | "bool";
type Env = { [variable: string]: Type | undefined };      // Gamma: names -> types

class CheckError extends Error {}                         // "no rule applies" = type error

function expectType(actual: Type, wanted: Type, where: string): void {
  if (actual !== wanted) throw new CheckError(where + ": expected " + wanted + ", got " + actual);
}

// ---- The type checker:  check(e, env)  answers  "Gamma |- e : ?" -------------------
function check(e: Expr, env: Env): Type {
  switch (e.kind) {
    case "int":                                   // T-Int:  Gamma |- n : int
      return "int";

    case "var": {                                 // T-Var:  x : T in Gamma  =>  Gamma |- x : T
      const t = env[e.name];
      if (t === undefined) throw new CheckError("unbound variable " + e.name);
      return t;
    }

    case "gt":                                    // T-Gt:   int > int : bool
      expectType(check(e.left, env), "int", "left of >");
      expectType(check(e.right, env), "int", "right of >");
      return "bool";

    // TASK 1 - T-Str:  a string literal has type string.

    // TASK 2 - T-Add:  int + int : int      string + string : string
    //                  any other combination: throw new CheckError("...")

    // TASK 3 - T-If:   the condition must be bool, both branches must have the SAME
    //                  type T, and the whole expression has type T.
  }
}

// ---- Test programs (do not edit) ---------------------------------------------------
const int = (value: number): Expr => ({ kind: "int", value });
const str = (value: string): Expr => ({ kind: "str", value });
const v = (name: string): Expr => ({ kind: "var", name });
const add = (left: Expr, right: Expr): Expr => ({ kind: "add", left, right });
const gt = (left: Expr, right: Expr): Expr => ({ kind: "gt", left, right });
const iff = (cond: Expr, then: Expr, els: Expr): Expr => ({ kind: "if", cond, then, else: els });

const gamma: Env = { x: "int", name: "string", age: "int" };

const programs: [string, Expr, Type | "error"][] = [
  ['1) x + 5', add(v("x"), int(5)), "int"],
  ['2) name + "!"', add(v("name"), str("!")), "string"],
  ['3) name + 5', add(v("name"), int(5)), "error"],
  ['4) age > 18', gt(v("age"), int(18)), "bool"],
  ['5) if age > 18 then name else 0', iff(gt(v("age"), int(18)), v("name"), int(0)), "error"],
  ['6) y + 1', add(v("y"), int(1)), "error"],
  ['7) if age > 18 then "adult" else "minor"', iff(gt(v("age"), int(18)), str("adult"), str("minor")), "string"],
  ['8) if x then 1 else 2', iff(v("x"), int(1), int(2)), "error"],
  ['9) (x + 5) > age', gt(add(v("x"), int(5)), v("age")), "bool"],
];

for (const [source, expr, wanted] of programs) {
  let got: string;
  let note = "";
  try {
    const t = check(expr, gamma);
    got = t === undefined ? "no rule yet" : t;
  } catch (e) {
    if (e instanceof CheckError) { got = "error"; note = "   (" + e.message + ")"; }
    else { got = "CRASH"; note = "   (" + String(e) + ")"; }
  }
  const ok = got === wanted;
  console.log((ok ? "PASS  " : "FAIL  ") + source + "   =>   " + got + note + (ok ? "" : "   expected " + wanted));
}

// ---- STRETCH (finish at home if there is no time) ----------------------------------
// S1  Evaluator. "Type-check first. Only accepted expressions are evaluated." (slide 22)
//     Write  evaluate(e: Expr, sigma: { [variable: string]: number | string | boolean }) .
//     Use sigma = { x: 10, name: "Ali", age: 20 }. Evaluate programs 1, 2, 4, 7, 9.
//     Question: your evaluator needs no error handling for  name + 5 . Why not?
// S2  New rule. Add  { kind: "eq"; left: Expr; right: Expr }  for  e1 == e2 .
//     First WRITE the rule as a comment (premises above the line, conclusion below),
//     then add the case. Should  1 == "1"  be accepted? You are the language designer.
