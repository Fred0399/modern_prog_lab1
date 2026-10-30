# Lab 2 report: Extend the MiniLang parser

Name:
Partner (if you worked in a pair):

## 1. Test output

Paste the last 8 lines that `npm test` (or the Playground) printed for `01_minilang_parser.ts`.

```
(paste here)
```

## 2. Your grammar

Paste the GRAMMAR comment from your file, as it is now.

```
(paste here)
```

## 3. Precedence and associativity

1. Which line of your code makes `*` bind tighter than `+` and `-`? Give the line number and explain in one sentence.
2. Which line makes `8 - 3 - 2` group as `(8 - 3) - 2`? What would you change to get `8 - (3 - 2)`, and why is that wrong for `-`?

## 4. Typing rules

Write the rules you added in the notation of Lecture 2 (premises above, conclusion below), then point to the `case` in `check()` that implements each one.

- T-Sub:
- T-Mul:


## 5. Stretch (Home)

- Step 4 (true/false): why is `trueish` still an identifier?
- Step 5 (unary minus): how does your parser tell unary `-` from binary `-`?
- Step 6 (`>=`, `==`): where did `">="` have to go in `RULES`, and why? Your rule T-Eq: which operand types does `==` accept, and why?
