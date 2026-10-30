// MPLT Lab 2 · Hook: predict the tree (5 min)
//
// This is the Lecture 3 parser with ONE design change: the + level and the > level have swapped places.
// Before you press Run, vote. What does this parser build for  1 + 2 > 3 ?
//   (a)  ((1 + 2) > 3)
//   (b)  (1 + (2 > 3))
//   (c)  a syntax error
// Then run it. Which tree does check() accept? Which slide of Lecture 3 showed this tree?

// ---------- Grammar (EBNF): the levels are swapped ----------
//   expr    = "if" expr "then" expr "else" expr | compare;
//   compare = sum [ ">" sum ] ;
//   sum     = primary { "+" primary } ;
//   primary = INT | STRING | IDENT | "(" expr ")" ;

type Expr =
  | { kind: "int"; value: number }
  | { kind: "str"; value: string }
  | { kind: "var"; name: string }
  | { kind: "add"; left: Expr; right: Expr }
  | { kind: "gt"; left: Expr; right: Expr }
  | { kind: "if"; cond: Expr; then: Expr; else: Expr };

// ---------- Lexer (unchanged from Lecture 3) ----------
type Token = { kind: string; text: string; pos: number };

const RULES: [string, RegExp][] = [
  ["ws",    /\s+/y],
  ["int",   /[0-9]+/y],
  ["ident", /[A-Za-z_]\w*/y],
  ["str",   /"[^"]*"/y],
  ["+",     /\+/y],
  [">",     />/y],
  ["(",     /\(/y],
  [")",     /\)/y],
];
const KW = new Set(["if", "then", "else"]);

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
    re.lastIndex = pos;
    const m = re.exec(src);
    if (m === null) continue;
    const k = kind === "ident" && KW.has(m[0]) ? m[0] : kind;
    return { kind: k, text: m[0], pos };
  }
  throw new Error(`bad character '${src[pos]}' at ${pos}`);
}

class Parser {
  private i = 0;
  private tokens: Token[];
  constructor(tokens: Token[]) { this.tokens = tokens; }
  peek(): Token { return this.tokens[this.i]; }
  next(): Token { return this.tokens[this.i++]; }
  expect(kind: string): Token {
    const t = this.next();
    if (t.kind !== kind) throw new Error(`expected ${kind} at ${t.pos}`);
    return t;
  }
}

function parse(src: string): Expr {
  const p = new Parser(tokenize(src));
  const e = parseExpr(p);
  p.expect("eof");
  return e;
}

// ---------- Parser: same functions as Lecture 3, but each one calls the wrong level ----------
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

// sum = primary { "+" primary } ;
function parseSum(p: Parser): Expr {
  let left = parsePrimary(p);
  while (p.peek().kind === "+") {
    p.next();
    left = { kind: "add", left, right: parsePrimary(p) };
  }
  return left;
}

// compare = sum [ ">" sum ] ;
function parseCompare(p: Parser): Expr {
  const left = parseSum(p);
  if (p.peek().kind !== ">") return left;
  p.next();
  return { kind: "gt", left, right: parseSum(p) };
}

// primary = INT | STRING | IDENT | "(" expr ")" ;
function parsePrimary(p: Parser): Expr {
  const t = p.next();
  switch (t.kind) {
    case "int":   return { kind: "int", value: Number(t.text) };
    case "str":   return { kind: "str", value: t.text.slice(1, -1) };
    case "ident": return { kind: "var", name: t.text };
    case "(": { const e = parseExpr(p); p.expect(")"); return e; }
    default: throw new Error(`unexpected ${t.kind} at ${t.pos}`);
  }
}

// ---------- Type checker (Lab 1) and a printer ----------
type Type = "int" | "string" | "bool";
type Env = { [variable: string]: Type | undefined };
class CheckError extends Error {}

function check(e: Expr, env: Env): Type {
  switch (e.kind) {
    case "int": return "int";
    case "str": return "string";
    case "var": {
      const t = env[e.name];
      if (t === undefined) throw new CheckError(`unbound variable '${e.name}'`);
      return t;
    }
    case "add": {
      const l = check(e.left, env);
      const r = check(e.right, env);
      if (l === "int" && r === "int") return "int";
      if (l === "string" && r === "string") return "string";
      throw new CheckError(`'+' needs int + int or string + string, got ${l} + ${r}`);
    }
    case "gt": {
      const l = check(e.left, env);
      const r = check(e.right, env);
      if (l !== "int" || r !== "int") throw new CheckError(`'>' needs int > int, got ${l} > ${r}`);
      return "bool";
    }
    case "if": {
      if (check(e.cond, env) !== "bool") throw new CheckError("if condition must be bool");
      const t1 = check(e.then, env);
      const t2 = check(e.else, env);
      if (t1 !== t2) throw new CheckError(`if branches differ: ${t1} vs ${t2}`);
      return t1;
    }
  }
}

function show(e: Expr): string {
  switch (e.kind) {
    case "int": return String(e.value);
    case "str": return JSON.stringify(e.value);
    case "var": return e.name;
    case "add": return `(${show(e.left)} + ${show(e.right)})`;
    case "gt": return `(${show(e.left)} > ${show(e.right)})`;
    case "if": return `(if ${show(e.cond)} then ${show(e.then)} else ${show(e.else)})`;
  }
}

// ---------- Run ----------
for (const src of ["1 + 2 > 3", "2 > 1 + 1"]) {
  const tree = parse(src);
  let verdict: string;
  try { verdict = check(tree, {}); } catch (err) { verdict = err instanceof Error ? "type error: " + err.message : String(err); }
  console.log(`${src.padEnd(10)}  tree ${show(tree).padEnd(16)}  check ${verdict}`);
}

export {}