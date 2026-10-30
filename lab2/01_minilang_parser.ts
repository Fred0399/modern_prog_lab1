// MPLT Lab 2 · Extend the MiniLang parser
//
// We get the parser from Lecture 3 (slides 7-8 and 18-20) and the Lab 1 type checker. Both work.
// Your job: make the language bigger. Rule for every step: edit the GRAMMAR comment first, then the code.
//
// Run it: Playground: press Run. Local: npm test (or node lab2/01_minilang_parser.ts).
// The tests at the bottom print one line per step. You are done with the core when the last line is: CORE DONE
//
// CORE
//   Step 1  Binary minus. Same level as +.
//           New Expr kind:  { kind: "sub"; left: Expr; right: Expr }
//           8 - 3 - 2 must give ((8 - 3) - 2)
//   Step 2  Multiplication. * binds tighter than + and -, so it needs a new grammar level: term.
//           New Expr kind:  { kind: "mul"; left: Expr; right: Expr }
//           1 + 2 * 3 must give (1 + (2 * 3))
//   Step 3  Since step 1, check() is red: TypeScript lists the kinds it does not handle (look at assertNever).
//           Add the rules  T-Sub:  e1 : int, e2 : int  =>  e1 - e2 : int   and   T-Mul (same shape).
//
// STRETCH (in class if you have time, otherwise at home)
//   Step 4  true and false.  { kind: "bool"; value: boolean }  and the rule T-Bool.
//   Step 5  Unary minus: -x, 2 - -3.  { kind: "neg"; operand: Expr }.  Binds tighter than *.
//   Step 6  >= and ==, same level as >.  { kind: "ge"; left; right } and { kind: "eq"; left; right }.
//           Careful: matchAt returns the FIRST rule that matches (slide 8). Where must ">=" go in RULES?
//           T-Ge is like T-Gt. T-Eq is your decision: which operand types may == compare? Explain it in REPORT.md.
//
// Rules: do not edit anything below the INSTRUCTOR ZONE line. Do not use any, as, ! or @ts-ignore.

// =====================================================================================
// STUDENT ZONE
// =====================================================================================

// ---------- Grammar (EBNF). Edit this first in every step. [for core assignments] ----------
//   expr    = "if" expr "then" expr "else" expr | compare ;
//   compare = sum [ ">" sum ] ;
//   sum = term { ( "+" | "-" ) term } ;
//   term= primary { "*" primary } ;
//   primary = INT | STRING | IDENT | "(" expr ")" ;
// 
//  ---------- Grammar (EBNF). Edit this first in every step. [for home assignments] ----------
// expr    = "if" expr "then" expr "else" expr | compare ;
// compare = sum [ ( ">" | ">=" | "==" ) sum ] ;
// sum     = term { ( "+" | "-" ) term } ;
// term    = unary { "*" unary } ;
// unary   = "-" unary | primary ;
// primary = INT | STRING | IDENT | "true" | "false" | "(" expr ")" ;
// 
// Pipeline:  source text --tokenize--> Token[] --parse--> Expr --check--> Type

// ---------- AST: the Lab 1 Expr type (slide 12) ----------
type Expr =
  | { kind: "int"; value: number }
  | { kind: "str"; value: string }
  | { kind: "bool"; value: boolean }
  | { kind: "var"; name: string }
  | { kind: "neg"; operand: Expr }
  | { kind: "add"; left: Expr; right: Expr }
  | { kind: "sub"; left: Expr; right: Expr }
  | { kind: "mul"; left: Expr; right: Expr }
  | { kind: "gt"; left: Expr; right: Expr }
  | { kind: "ge"; left: Expr; right: Expr }
  | { kind: "eq"; left: Expr; right: Expr }
  | { kind: "if"; cond: Expr; then: Expr; else: Expr };

// ---------- Lexer: token rules (slide 7) and the tokenizer loop (slide 8) ----------
type Token = { kind: string; text: string; pos: number };

const RULES: [string, RegExp][] = [
  ["ws",    /\s+/y],
  ["int",   /[0-9]+/y],
  ["ident", /[A-Za-z_]\w*/y],
  ["str",   /"[^"]*"/y],
  ["+",     /\+/y],
  [">=",    />=/y],
  [">",     />/y],
  ["==",    /==/y],
  ["(",     /\(/y],
  [")",     /\)/y],
  ["-",     /-/y],
  ["*",     /\*/y],
];
const KW = new Set(["if", "then", "else", "true", "false"]);

function tokenize(src: string): Token[] {
  const out: Token[] = [];
  let pos = 0;
  while (pos < src.length) {
    const t = matchAt(src, pos);
    if (t.kind !== "ws") out.push(t);
    pos += t.text.length;
  }
  out.push({ kind: "eof", text: "", pos });
  return out;
}

function matchAt(src: string, pos: number): Token {
  for (const [kind, re] of RULES) {
    re.lastIndex = pos; // sticky: match at pos
    const m = re.exec(src);
    if (m === null) continue;
    const k = kind === "ident" && KW.has(m[0]) ? m[0] : kind;
    return { kind: k, text: m[0], pos };
  }
  throw new Error(`bad character '${src[pos]}' at ${pos}`);
}

// ---------- Parser state: peek / next / expect (slide 18) ----------
class Parser {
  private i = 0;
  private tokens: Token[];
  constructor(tokens: Token[]) { this.tokens = tokens; }

  peek(): Token { return this.tokens[this.i]; }
  next(): Token { return this.tokens[this.i++]; }

  expect(kind: string): Token {
    const t = this.next();
    if (t.kind !== kind)
      throw new Error(`expected ${kind} at ${t.pos}`);
    return t;
  }
}

// ---------- Entry point (slide 20) ----------
function parse(src: string): Expr {
  const p = new Parser(tokenize(src));
  const e = parseExpr(p);
  p.expect("eof");
  return e;
}

// ---------- Recursive descent: one function per grammar rule (slides 19 and 20) ----------
// expr = "if" expr "then" expr "else" expr | compare ; 
function parseExpr(p: Parser): Expr {
  if (p.peek().kind !== "if") return parseCompare(p);
  p.next();
  const cond = parseExpr(p);
  p.expect("then");
  const thenE = parseExpr(p);
  p.expect("else");
  return { kind: "if", cond, then: thenE, else: parseExpr(p) };
}

// compare = sum [ ( ">" | ">=" | "==" ) sum ] ;
function parseCompare(p: Parser): Expr {
  const left = parseSum(p);
  const op = p.peek().kind;
  if (op !== ">" && op !== ">=" && op !== "==") return left;
  p.next();
  const right = parseSum(p);
  if (op === ">") return { kind: "gt", left, right };
  if (op === ">=") return { kind: "ge", left, right };
  return { kind: "eq", left, right };
}

// sum = term { ( "+" | "-" ) term } ;
function parseSum(p: Parser): Expr {
  let left = parseTerm(p);
  while (p.peek().kind === "+" || p.peek().kind === "-") {
    const op = p.next().kind;
    const right = parseTerm(p);
    left = op === "+" ? { kind: "add", left, right } : { kind: "sub", left, right };
  }
  return left;
}

// term = unary { "*" unary } ;
function parseTerm(p: Parser): Expr {
  let left = parseUnary(p);
  while (p.peek().kind === "*") {
    p.next();
    left = { kind: "mul", left, right: parseUnary(p) };
  }
  return left;
}

// unary = "-" unary | primary ;
function parseUnary(p: Parser): Expr {
  if (p.peek().kind !== "-") return parsePrimary(p);
  p.next();
  return { kind: "neg", operand: parseUnary(p) };
}

// primary = INT | STRING | IDENT | "true" | "false" | "(" expr ")" ;
function parsePrimary(p: Parser): Expr {
  const t = p.next();
  switch (t.kind) {
    case "int":   return { kind: "int", value: Number(t.text) };
    case "str":   return { kind: "str", value: t.text.slice(1, -1) };
    case "true":  return { kind: "bool", value: true };
    case "false": return { kind: "bool", value: false };
    case "ident": return { kind: "var", name: t.text };
    case "(": { const e = parseExpr(p); p.expect(")"); return e; }
    default: throw new Error(`unexpected ${t.kind} at ${t.pos}`);
  }
}

// ---------- Type checker: the Lab 1 rules (Lecture 2) ----------
type Type = "int" | "string" | "bool";
type Env = { [variable: string]: Type | undefined };
class CheckError extends Error {}

function assertNever(x: never): never {
  throw new Error("check() has no case for: " + JSON.stringify(x));
}

function check(e: Expr, env: Env): Type {
  switch (e.kind) {
    case "int": // T-Int
      return "int";
    case "str": // T-Str
      return "string";
    case "bool": // T-Bool
      return "bool";
    case "var": { // T-Var
      const t = env[e.name];
      if (t === undefined) throw new CheckError(`unbound variable '${e.name}'`);
      return t;
    }
    case "add": { // T-Add-Int and T-Add-Str
      const l = check(e.left, env);
      const r = check(e.right, env);
      if (l === "int" && r === "int") return "int";
      if (l === "string" && r === "string") return "string";
      throw new CheckError(`'+' needs int + int or string + string, got ${l} + ${r}`);
    }
    case "sub": { // T-Sub
      const l = check(e.left, env);
      const r = check(e.right, env);
      if (l !== "int" || r !== "int") throw new CheckError(`'-' needs int - int, got ${l} - ${r}`);
      return "int";
    }
    case "mul": { // T-Mul
      const l = check(e.left, env);
      const r = check(e.right, env);
      if (l !== "int" || r !== "int") throw new CheckError(`'*' needs int * int, got ${l} * ${r}`);
      return "int";
    }
    case "neg": { // T-Neg
      const t = check(e.operand, env);
      if (t !== "int") throw new CheckError(`unary '-' needs int, got ${t}`);
      return "int";
    }
    case "gt": { // T-Gt
      const l = check(e.left, env);
      const r = check(e.right, env);
      if (l !== "int" || r !== "int") throw new CheckError(`'>' needs int > int, got ${l} > ${r}`);
      return "bool";
    }
    case "ge": { // T-Ge
      const l = check(e.left, env);
      const r = check(e.right, env);
      if (l !== "int" || r !== "int") throw new CheckError(`'>=' needs int >= int, got ${l} >= ${r}`);
      return "bool";
    }
    case "eq": { // T-Eq
      const l = check(e.left, env);
      const r = check(e.right, env);
      if (l !== r) throw new CheckError(`'==' needs both sides of the same type, got ${l} == ${r}`);
      return "bool";
    }
    case "if": { // T-If
      const c = check(e.cond, env);
      if (c !== "bool") throw new CheckError(`if condition must be bool, got ${c}`);
      const t1 = check(e.then, env);
      const t2 = check(e.else, env);
      if (t1 !== t2) throw new CheckError(`if branches differ: then is ${t1}, else is ${t2}`);
      return t1;
    }
    default:
      return assertNever(e);
  }
}

// ---------- Try it (edit freely) ----------
const tryIt = "if age > 18 then name else \"minor\"";
console.log("tokens:", showTokens(tokenize(tryIt)));
console.log("tree:  ", show(parse(tryIt)));
console.log("");

// =====================================================================================
// INSTRUCTOR ZONE: DO NOT EDIT BELOW THIS LINE. These tests decide when a step is done.
// =====================================================================================

// show() prints a tree with full parentheses, for example ((1 + 2) > 3).
// It reads nodes by shape, so it already knows every kind from steps 1-6.
type ShowNode = {
  kind: string;
  value?: unknown;
  name?: unknown;
  left?: ShowNode;
  right?: ShowNode;
  operand?: ShowNode;
  cond?: ShowNode;
  then?: ShowNode;
  else?: ShowNode;
};

function opSymbol(kind: string): string {
  switch (kind) {
    case "add": return "+";
    case "sub": return "-";
    case "mul": return "*";
    case "gt": return ">";
    case "ge": return ">=";
    case "eq": return "==";
    default: return "?" + kind;
  }
}

function show(n: ShowNode): string {
  if (n.kind === "str") return JSON.stringify(n.value);
  if (n.kind === "int" || n.kind === "bool") return String(n.value);
  if (n.kind === "var") return String(n.name);
  if (n.kind === "neg" && n.operand !== undefined) return `(-${show(n.operand)})`;
  if (n.kind === "if" && n.cond !== undefined && n.then !== undefined && n.else !== undefined)
    return `(if ${show(n.cond)} then ${show(n.then)} else ${show(n.else)})`;
  if (n.left !== undefined && n.right !== undefined)
    return `(${show(n.left)} ${opSymbol(n.kind)} ${show(n.right)})`;
  return `<unknown node ${JSON.stringify(n)}>`;
}

function showTokens(ts: Token[]): string {
  return ts.map((t) => (t.kind === "eof" ? "eof" : `${t.kind}:${t.text}`)).join(" ");
}

type Group = "REGRESSION" | "STEP 1" | "STEP 2" | "STEP 3" | "STEP 4" | "STEP 5" | "STEP 6";
type Row =
  | { group: Group; src: string; tree: string }
  | { group: Group; src: string; error: string }
  | { group: Group; src: string; type: Type | "type error" }
  | { group: Group; src: string; tokens: string };

// Variables the type tests may use (Lecture 2, slide 22).
const GAMMA: Env = { x: "int", age: "int", name: "string" };

const TESTS: Row[] = [
  // Everything that worked before must still work.
  { group: "REGRESSION", src: "age > 18", tokens: "ident:age >:> int:18 eof" },
  { group: "REGRESSION", src: "1 + 2 + 3", tree: "((1 + 2) + 3)" },
  { group: "REGRESSION", src: "1 + 2 > 3", tree: "((1 + 2) > 3)" },
  { group: "REGRESSION", src: "(1 + 2) > 3", tree: "((1 + 2) > 3)" },
  { group: "REGRESSION", src: "if age > 18 then name else \"minor\"", tree: "(if (age > 18) then name else \"minor\")" },
  { group: "REGRESSION", src: "1 $ 2", error: "bad character '$' at 2" },
  { group: "REGRESSION", src: "(1 + 2", error: "expected ) at 6" },
  { group: "REGRESSION", src: "1 +", error: "unexpected eof at 3" },
  { group: "REGRESSION", src: "1 > 2 > 3", error: "expected eof at 6" },
  { group: "REGRESSION", src: "if age > 18 name else 1", error: "expected then at 12" },
  { group: "REGRESSION", src: "x + 5", type: "int" },
  { group: "REGRESSION", src: "name + \"!\"", type: "string" },
  { group: "REGRESSION", src: "name + 5", type: "type error" },
  { group: "REGRESSION", src: "age > 18", type: "bool" },
  { group: "REGRESSION", src: "if age > 18 then name else 0", type: "type error" },
  { group: "REGRESSION", src: "y + 1", type: "type error" },
  { group: "REGRESSION", src: "if age > 18 then name else \"minor\"", type: "string" },

  // Step 1: binary minus, left-associative, same level as +.
  { group: "STEP 1", src: "8 - 3 - 2", tree: "((8 - 3) - 2)" },
  { group: "STEP 1", src: "1 - 2 + 3", tree: "((1 - 2) + 3)" },
  { group: "STEP 1", src: "1 + 2 - 3", tree: "((1 + 2) - 3)" },
  { group: "STEP 1", src: "x-1", tree: "(x - 1)" },
  { group: "STEP 1", src: "10 - 4 > 3", tree: "((10 - 4) > 3)" },
  { group: "STEP 1", src: "1 -", error: "unexpected eof at 3" },

  // Step 2: multiplication, one level deeper than + and -.
  { group: "STEP 2", src: "1 + 2 * 3", tree: "(1 + (2 * 3))" },
  { group: "STEP 2", src: "2 * 3 + 1", tree: "((2 * 3) + 1)" },
  { group: "STEP 2", src: "2 * 3 * 4", tree: "((2 * 3) * 4)" },
  { group: "STEP 2", src: "(1 + 2) * 3", tree: "((1 + 2) * 3)" },
  { group: "STEP 2", src: "8 - 2 * 3 - 1", tree: "((8 - (2 * 3)) - 1)" },
  { group: "STEP 2", src: "2 * 3 > 5", tree: "((2 * 3) > 5)" },
  { group: "STEP 2", src: "1 * * 2", error: "unexpected * at 4" },

  // Step 3: typing rules T-Sub and T-Mul.
  { group: "STEP 3", src: "1 - 2", type: "int" },
  { group: "STEP 3", src: "x * 2 + 1", type: "int" },
  { group: "STEP 3", src: "2 * 3 > 5", type: "bool" },
  { group: "STEP 3", src: "if x > 1 then x * 2 else 0", type: "int" },
  { group: "STEP 3", src: "\"a\" * 2", type: "type error" },
  { group: "STEP 3", src: "name - 1", type: "type error" },
  { group: "STEP 3", src: "1 - (2 > 1)", type: "type error" },

  // Step 4 (stretch): true and false.
  { group: "STEP 4", src: "true false", tokens: "true:true false:false eof" },
  { group: "STEP 4", src: "trueish", tree: "trueish" },
  { group: "STEP 4", src: "if true then 1 else 2", type: "int" },
  { group: "STEP 4", src: "false", type: "bool" },
  { group: "STEP 4", src: "true + 1", type: "type error" },

  // Step 5 (stretch): unary minus.
  { group: "STEP 5", src: "-x", tree: "(-x)" },
  { group: "STEP 5", src: "2 - -3", tree: "(2 - (-3))" },
  { group: "STEP 5", src: "-x * 2", tree: "((-x) * 2)" },
  { group: "STEP 5", src: "--1", tree: "(-(-1))" },
  { group: "STEP 5", src: "-x + 1", type: "int" },
  { group: "STEP 5", src: "-name", type: "type error" },

  // Step 6 (stretch): >= and ==.
  { group: "STEP 6", src: "a>=b", tokens: "ident:a >=:>= ident:b eof" },
  { group: "STEP 6", src: "a >= b", tree: "(a >= b)" },
  { group: "STEP 6", src: "a == b", tree: "(a == b)" },
  { group: "STEP 6", src: "1 + 2 == 3", tree: "((1 + 2) == 3)" },
  { group: "STEP 6", src: "1 == 2 == 3", error: "expected eof at 7" },
  { group: "STEP 6", src: "a = b", error: "bad character '=' at 2" },
  { group: "STEP 6", src: "x >= 1", type: "bool" },
  { group: "STEP 6", src: "1 == 1", type: "bool" },
];

const STRETCH: Group[] = ["STEP 4", "STEP 5", "STEP 6"];

function messageOf(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

// Runs one row and reports what was expected and what the code produced.
function runRow(row: Row): { ok: boolean; expected: string; got: string } {
  if ("tokens" in row) {
    let got: string;
    try { got = showTokens(tokenize(row.src)); } catch (err) { got = "error: " + messageOf(err); }
    return { ok: got === row.tokens, expected: row.tokens, got };
  }
  if ("tree" in row) {
    let got: string;
    try { got = show(parse(row.src)); } catch (err) { got = "error: " + messageOf(err); }
    return { ok: got === row.tree, expected: row.tree, got };
  }
  if ("error" in row) {
    let got: string;
    try { got = "no error, tree " + show(parse(row.src)); } catch (err) { got = messageOf(err); }
    return { ok: got === row.error, expected: "error: " + row.error, got };
  }
  let got: string;
  let parsed: Expr;
  try { parsed = parse(row.src); } catch (err) { return { ok: false, expected: row.type, got: "parse error: " + messageOf(err) }; }
  try { got = check(parsed, GAMMA); } catch (err) {
    got = err instanceof CheckError ? "type error" : "crash: " + messageOf(err);
  }
  return { ok: got === row.type, expected: row.type, got };
}

const groups: Group[] = ["REGRESSION", "STEP 1", "STEP 2", "STEP 3", "STEP 4", "STEP 5", "STEP 6"];
let coreMissing = 0;
for (const g of groups) {
  const rows = TESTS.filter((r) => r.group === g);
  const results = rows.map((r) => ({ row: r, res: runRow(r) }));
  const passed = results.filter((x) => x.res.ok).length;
  const stretch = STRETCH.includes(g);
  const label = stretch ? `${g} (stretch)` : g;
  console.log(`${label.padEnd(18)} ${passed}/${rows.length}${passed === rows.length ? "  ok" : ""}`);
  const failing = results.filter((x) => !x.res.ok);
  if (!stretch) coreMissing += failing.length;
  for (const { row, res } of failing.slice(0, 3)) {
    const mark = stretch ? "  todo" : "  FAIL";
    console.log(`${mark}  ${JSON.stringify(row.src).padEnd(30)} expected ${res.expected}`);
    console.log(`        ${"".padEnd(30)} got      ${res.got}`);
  }
  if (failing.length > 3) console.log(`        ... and ${failing.length - 3} more`);
}
console.log("");
console.log(coreMissing === 0 ? "CORE DONE" : `CORE: not yet (${coreMissing} test(s) to go)`);

export {}