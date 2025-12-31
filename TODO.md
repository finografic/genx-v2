Great questions — these are exactly the right ones to ask *before* you start writing code.
I’ll answer both **concretely**, with **practical patterns**, not abstractions.

---

# 1️⃣ “Apply TypeScript” to an existing package

### Yes — and it should be a **codemod-style generator**, not a scaffold

Think of this as:

> **`finografic apply typescript`**

Not “create”, but **mutate an existing repo** in a controlled way.

---

## What this script should do (opinionated but safe)

### Phase 0 — Safety checks (mandatory)

* ensure `package.json` exists
* ensure no `tsconfig.json` (or ask before overwriting)
* detect existing JS vs TS
* detect ESM vs CJS

If any of these fail → prompt user.

---

### Phase 1 — Install dependencies

```ts
pnpm add -D typescript tsx @types/node
```

(Optionally ESLint config later.)

---

### Phase 2 — Create config files

* `tsconfig.json`
* optionally:

  * `tsconfig.build.json`
  * `.gitignore` additions

---

### Phase 3 — Rename files

* `src/**/*.js` → `.ts`
* `index.js` → `index.ts`

This is **mechanical**, not semantic.

---

### Phase 4 — Patch package.json

* add `"type": "module"` (if needed)
* add `"types"`
* add `"build"` script
* add `"exports"` map (optional)

This should be done via **JSON mutation**, not templating.

---

### Phase 5 — Print next steps

```txt
Run:
  pnpm build
  fix TS errors manually
```

No illusions. No “magic success”.

---

## Minimal implementation sketch

```ts
export async function applyTypeScript(root: string) {
  assertPackage(root)
  await installDeps()
  writeTsconfig(root)
  renameSourceFiles(root)
  patchPackageJson(root)
}
```

This is **absolutely** in-scope for your generator.

---

# 2️⃣ Where token replacements actually belong

### (This is the most important architectural answer)

> **Tokens live ONLY inside templates**
> **Replacement happens during file copy**

Never inside logic files. Never sprinkled everywhere.

---

## Correct mental model

### Template file (dumb)

```json
{
  "name": "__SCOPE__/__NAME__",
  "version": "0.1.0"
}
```

### Generator logic (smart)

```ts
replaceTokens(file, {
  __NAME__: name,
  __SCOPE__: scope
})
```

---

## Recommended implementation pattern

### `templates/package/package.json`

```json
{
  "name": "__SCOPE__/__NAME__",
  "version": "0.1.0",
  "private": false
}
```

---

### `utils/template.ts`

```ts
export function applyTemplate(
  content: string,
  vars: Record<string, string>
) {
  return content.replace(/__([A-Z_]+)__/g, (_, key) => {
    return vars[key] ?? `__${key}__`
  })
}
```

---

### `utils/fs.ts`

```ts
import { readFile, writeFile } from 'node:fs/promises'
import { applyTemplate } from './template.js'

export async function copyTemplate(
  src: string,
  dest: string,
  vars: Record<string, string>
) {
  const content = await readFile(src, 'utf8')
  const result = applyTemplate(content, vars)
  await writeFile(dest, result)
}
```

---

## Why this approach is the right one

| Approach                       | Verdict          |
| ------------------------------ | ---------------- |
| Token replacement at copy-time | ✅ Correct        |
| Runtime replacements later     | ❌ No             |
| AST-based JSON edits           | ❌ Overkill       |
| Mixed logic + template         | ❌ Unmaintainable |

Templates should be **boring** and **transparent**.

---

## Naming conventions for tokens (important)

Stick to:

```
__UPPER_SNAKE_CASE__
```

Examples:

* `__NAME__`
* `__SCOPE__`
* `__PACKAGE_NAME__`
* `__AUTHOR__`

This avoids:

* collisions
* accidental replacements
* editor auto-formatting issues

---

# 3️⃣ How these two ideas fit together cleanly

You now have **two generator types**:

### 1️⃣ Scaffold generators

```bash
finografic create package
```

* copy templates
* replace tokens

### 2️⃣ Apply generators (codemods)

```bash
finografic apply typescript
```

* detect
* mutate
* patch
* guide

Both:

* share prompt system
* share fs utils
* share git helpers
* share conventions

---

## Final straight answer (no hedging)

| Question                                | Answer             |
| --------------------------------------- | ------------------ |
| Can TS be applied to existing packages? | ✅ Yes              |
| Should it be a generator?               | ✅ Yes              |
| Should it be a codemod-style tool?      | ✅ Absolutely       |
| Where do token replacements go?         | ✅ Inside templates |
| When do replacements happen?            | ✅ During copy      |
| Should logic files contain tokens?      | ❌ Never            |

---

If you want next:

* a **full `apply typescript` implementation**
* or a **baseline TypeScript template**
* or a **shared `GeneratorContext` abstraction**

Say which one and I’ll build it cleanly.
