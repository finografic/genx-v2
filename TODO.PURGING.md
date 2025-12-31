I'll scan the project and recommend which files to keep for a CLI generator/codemod toolkit.

[6 tools called]

Perfect! I've scanned your project. Here's my recommendation for what to **KEEP** vs **DELETE** when you purge it:

## ✅ **DEFINITELY KEEP**

### Config & Build Files

- `package.json` *(will need heavy modification - rename, add CLI bin, etc.)*
- `tsconfig.json`
- `tsdown.config.ts` *(or switch to another bundler if preferred)*
- `vitest.config.ts` *(for testing generators)*
- `eslint.config.mjs`
- `prettier.config.mjs`
- `commitlint.config.mjs`
- `LICENSE`
- `README.md` *(already updated!)*
- `TODO.md` *(excellent working doc)*

### Useful Source Files

- **`src/utils/string-case.utils.ts`** — **VERY USEFUL** for generators! You'll need:
  - `capitalize()` for package names
  - `camelCaseToKebab()` for file/folder naming
  - These are perfect for token replacement and name transformations

- **`src/constants/zod-errors.ts`** — **KEEP IF** you plan to use Zod for validating user inputs (package names, paths, etc.)

### Types That Might Be Useful

- Check `src/types/` folder - utility types could be helpful for the generator's internal type safety

---

## ❌ **SAFE TO DELETE**

### Generated/Installed

- `dist/` *(regenerates on build)*
- `node_modules/` *(regenerates on install)*
- `pnpm-lock.yaml` *(regenerates)*

### Probably Not Needed

- `src/constants/misc.constants.ts` *(just has empty `FOO_BAR`)*
- `src/utils/time.utils.ts` + `time.utils.test.ts` *(not relevant for a generator)*
- `src/utils/object-guards.utils.ts` *(probably not needed)*
- `src/utils/object-case.utils.ts` *(might be useful for config file manipulation, but optional)*
- `docs/RELEASES.md` *(start fresh)*

### Most Type Files

- Unless they're generic utility types, most of the `src/types/` folder is probably library-specific

---

## 🤔 **KEEP BUT EVALUATE**

- **`src/utils/object-case.utils.ts`** — The `toCamelCaseKeys()` function *could* be useful if you're manipulating config files programmatically, but it's not essential for the core generator functionality

---

## 📦 **Dependencies to Add (later)**

Based on your README and TODO:

- `@clack/prompts` — for interactive CLI
- `fs-extra` or just use Node's built-in `fs/promises` — for file operations
- `picocolors` — for terminal colors
- Potentially: `execa` for running commands, `fast-glob` for file discovery

---

## 🎯 **Summary**

**Keep these 3 source files:**

1. `src/utils/string-case.utils.ts` ← **Essential for generators**
2. `src/constants/zod-errors.ts` ← **Useful for validation**
3. Maybe `src/utils/object-case.utils.ts` ← **Optional for config manipulation**

Everything else in `src/` can go. Your string utilities are actually perfect for a generator toolkit — you'll use them constantly for package name transformations, file naming, etc.

Let me know when you've done the purge and I'll help you build it out! 🚀
