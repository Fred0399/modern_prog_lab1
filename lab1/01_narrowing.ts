// 01 NARROWING: make the compiler prove it is safe
// Lecture 2, slides 13-14.
//
// GOAL : 0 red underlines AND every line in the Logs tab says PASS.
// RULES: do NOT use  any ,  as  or the  !  operator.
//        Use  if ,  typeof ,  === null ,  === undefined .
// TIP  : hover over a variable to see the type the compiler knows at that exact line.

interface User { id: number; name: string; email: string | null; }

const users = new Map<number, User>([
  [1, { id: 1, name: "Aysel", email: "aysel@example.com" }],
  [2, { id: 2, name: "Murad", email: null }],
]);

// TASK 1 - Map.get returns  User | undefined . Hover over  u .
// Return the user's name, or "unknown" when there is no such user.
function userName(id: number): string {
  const u = users.get(id);
  return u.name;                               // <- fix me
}

// TASK 2 - two layers of absence: the user may be missing AND the email may be null.
// Return the part of the email after "@", or "no email".
function emailDomain(id: number): string {
  const u = users.get(id);
  return u.email.split("@")[1];                // <- fix me
}

// TASK 3 - typeof narrowing. An id arrives as a number (42) or as a string ("ab-7").
//   number -> "#0042"  (pad to 4 digits)        string -> "#AB-7"  (upper case)
function formatId(id: number | string): string {
  return "#" + id.padStart(4, "0");            // <- fix me
}

// TASK 4 - PREDICT first: no red underline here. Is the function correct?
// What does  label(0)  return? Run, then fix it:
// 0 is a valid quantity, only null means "unknown".
function label(qty: number | null): string {
  if (qty) { return "qty=" + qty; }
  return "unknown";
}

// ---- self-check (do not edit) -------------------------------------------------
function check(name: string, f: () => unknown, expected: unknown) {
  let got: unknown;
  try { got = f(); } catch (e) { got = "CRASH " + String(e); }
  const ok = JSON.stringify(got) === JSON.stringify(expected);
  console.log((ok ? "PASS  " : "FAIL  ") + name + (ok ? "" : "   got " + JSON.stringify(got) + ", expected " + JSON.stringify(expected)));
}
check("T1 userName(1)", () => userName(1), "Aysel");
check("T1 userName(9)", () => userName(9), "unknown");
check("T2 emailDomain(1)", () => emailDomain(1), "example.com");
check("T2 emailDomain(2)", () => emailDomain(2), "no email");
check("T2 emailDomain(9)", () => emailDomain(9), "no email");
check("T3 formatId(42)", () => formatId(42), "#0042");
check("T3 formatId('ab-7')", () => formatId("ab-7"), "#AB-7");
check("T4 label(0)", () => label(0), "qty=0");
check("T4 label(null)", () => label(null), "unknown");
