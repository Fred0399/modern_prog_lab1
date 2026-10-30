// 02 UNIONS: make illegal states unrepresentable
// Lecture 2, slides 15-16.
// Story: a model-training job is queued, running, done or failed.
//
// GOAL : 0 red underlines AND every line in the Logs tab says PASS.
// RULES: do NOT use  any ,  as  or the  !  operator.

// ---- BEFORE: one "bag of optional fields" ---------------------------------------
interface JobLoose {
  status: "queued" | "running" | "done" | "failed";
  progress?: number;     // only meaningful while running
  accuracy?: number;     // only meaningful when done
  error?: string;        // only meaningful when failed
}
// This compiles. It is nonsense: a queued job that has an accuracy AND an error.
const nonsense: JobLoose = { status: "queued", accuracy: 0.99, error: "out of memory" };

// ---- TASK 1 - redesign it as a discriminated union ------------------------------
// One object type per state. Each has a literal  kind  tag and ONLY its own fields:
//   queued  -> no extra fields            running -> progress: number   (0..1)
//   done    -> accuracy: number           failed  -> error: string
type Job =
  | { kind: "queued" }
  | { kind: "running"; progress: number };     // <- add the two missing cases

// Compile-time tests. Do not edit them.
// "@ts-expect-error" means: the NEXT line MUST be a type error.
// If your type is too loose, the directive itself gets a red underline.
const ok1: Job = { kind: "done", accuracy: 0.93 };
const ok2: Job = { kind: "failed", error: "out of memory" };
// @ts-expect-error  a queued job cannot carry an accuracy
const bad1: Job = { kind: "queued", accuracy: 0.99 };
// @ts-expect-error  a done job must have an accuracy
const bad2: Job = { kind: "done" };
// @ts-expect-error  a running job has no error message
const bad3: Job = { kind: "running", progress: 0.5, error: "?" };

// ---- TASK 2 - one function, every state handled ---------------------------------
// Return exactly:
//   "waiting" | "running 40%" | "done, accuracy 0.93" | "FAILED: out of memory"
// Inside each  case  hover over  job : the type is narrowed to that one state.
function describe(job: Job): string {
  switch (job.kind) {
    case "queued":
      return "waiting";
    // <- add the other cases
  }
}

// ---- TASK 3 - change the design, let the compiler find the work ------------------
// Add a fifth state to Job:   { kind: "cancelled"; by: string }
// Do NOT touch  describe  yet. Where does the red underline appear, and why?, add it as a comment.
// Then handle it:  "cancelled by Leyla" , and un-comment the last check below.
// Question: with JobLoose, how would you have found every place to update?

// ---- self-check (do not edit) ---------------------------------------------------
function check(name: string, f: () => unknown, expected: unknown) {
  let got: unknown;
  try { got = f(); } catch (e) { got = "CRASH " + String(e); }
  const ok = JSON.stringify(got) === JSON.stringify(expected);
  console.log((ok ? "PASS  " : "FAIL  ") + name + (ok ? "" : "   got " + JSON.stringify(got) + ", expected " + JSON.stringify(expected)));
}
check("T2 queued", () => describe({ kind: "queued" }), "waiting");
check("T2 running", () => describe({ kind: "running", progress: 0.4 }), "running 40%");
check("T2 done", () => describe(ok1), "done, accuracy 0.93");
check("T2 failed", () => describe(ok2), "FAILED: out of memory");
// check("T3 cancelled", () => describe({ kind: "cancelled", by: "Leyla" }), "cancelled by Leyla");
