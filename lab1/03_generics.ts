// 03 GENERICS: keep the relationship between types
// Lecture 2, slide 17.
//
// Press Run NOW: every check already says PASS. The JavaScript is correct.
// What is missing is knowledge in the TYPES: the red underlines.
// GOAL : 0 red underlines. RULES: do NOT use  any ,  as  or the  !  operator.

// ---- PREDICT (1 min): the  any  version. Compile error, run-time error, or fine? ----
function firstAny(xs: any[]): any { return xs[0]; }
const oops = () => firstAny([10, 20]).toUpperCase();

// ---- The generic version from the lecture: the output type follows the input type ----
function first<T>(xs: T[]): T | undefined { return xs.length > 0 ? xs[0] : undefined; }
const a = first([10, 20]);        // hover over  a
const b = first(["x", "y"]);      // hover over  b

// TASK 1 - last: like first, for the last element. Make it generic.
function last<T>(xs: T[]): T | undefined {
  return xs.length > 0 ? xs[xs.length - 1] : undefined;
}

// TASK 2 - pair: a tuple that remembers BOTH types.   pair(1, "a")  has type  [number, string]
function pair<A, B>(x: A, y: B): [A, B] {
  return [x, y];
}

// TASK 3 - a constraint. longest accepts anything that has a  length  (string, array, ...)
// and returns the SAME type it was given.   Hint:  <T extends { length: number }>
function longest<T extends { length: number }>(x: T, y: T): T {
  return x.length >= y.length ? x : y;
}

// TASK 4 - pluck: read one property from every object. The key must exist, and the
// result type must follow the key.   Hint:  <T, K extends keyof T>  and the type  T[K]
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}

// ---- compile-time tests (do not edit) ----------------------------------------------
const models = [
  { title: "resnet50", params: 25.6 },
  { title: "bert-base", params: 110 },
];
const t1: number | undefined = last([1, 2, 3]);
const t2: [number, string] = pair(1, "a");
const t3: string = longest("go", "python");
const t4: number[] = pluck(models, "params");
const t5: string[] = pluck(models, "title");
// @ts-expect-error  a number has no length
longest(1, 2);
// @ts-expect-error  "size" is not a property of a model
pluck(models, "size");

// ---- run-time checks (do not edit) -------------------------------------------------
function check(name: string, f: () => unknown, expected: unknown) {
  let got: unknown;
  try { got = f(); } catch (e) { got = "CRASH " + String(e); }
  const ok = JSON.stringify(got) === JSON.stringify(expected);
  console.log((ok ? "PASS  " : "FAIL  ") + name + (ok ? "" : "   got " + JSON.stringify(got) + ", expected " + JSON.stringify(expected)));
}
check("T1 last", () => last([1, 2, 3]), 3);
check("T2 pair", () => pair(1, "a"), [1, "a"]);
check("T3 longest", () => longest("go", "python"), "python");
check("T4 pluck params", () => pluck(models, "params"), [25.6, 110]);
check("T4 pluck title", () => pluck(models, "title"), ["resnet50", "bert-base"]);
try { oops(); } catch (e) { console.log("PREDICT  firstAny([10, 20]).toUpperCase()  ->  " + String(e)); }
