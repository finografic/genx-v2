# 🦋 @finografic/genx

> Opinionated generator and codemod toolkit for the **@finografic** ecosystem.

This package provides a small CLI for:

- scaffolding new `@finografic` packages
- applying conventions (e.g. TypeScript) to existing repositories
- keeping project structure **consistent, minimal, and explicit**

It is designed to be **run**, not installed.

---

## ✨ Features

<!-- GENERATED:FEATURES:START -->

### dprint

Code formatting via `@finografic/dprint-config`.

- Installs `@finografic/dprint-config`
- Creates `dprint.jsonc`
- Adds `format` / `format.check` scripts
- Replaces Prettier if present (uninstall + backup configs)
- Adds VSCode extension recommendation
- Configures language formatters in `.vscode/settings.json`

### vitest

Testing via Vitest.

- Installs `vitest`
- Adds `test` / `test.run` / `test.coverage` scripts

### ai-rules

AI coding assistant rules (GitHub Copilot instructions).

- Copies `.github/copilot-instructions.md`
- Copies `.github/instructions/` folder

### markdown

Markdown linting via `eslint-plugin-markdownlint`.

- Installs `eslint-plugin-markdownlint`
- Adds markdown block to `eslint.config.ts`
- Adds `[markdown]` settings to `.vscode/settings.json`
- Adds `markdownlint.config` to `.vscode/settings.json`
- Adds VSCode extension recommendation
- Copies `markdown-custom.css` for preview styling

### git-hooks

Pre-commit linting + conventional commits.

- Installs `lint-staged`, `simple-git-hooks`
- Installs `@commitlint/cli`, `@commitlint/config-conventional`
- Adds `lint-staged` config to package.json
- Adds `simple-git-hooks` config to package.json
- Creates `commitlint.config.mjs`
- Ensures `prepare` script runs `simple-git-hooks`

<!-- GENERATED:FEATURES:END -->

---

## 🚀 Usage

<!-- GENERATED:USAGE:START -->

Run directly using `pnpm dlx`:

```bash
pnpm dlx @finografic/genx <command> [options]
```

| Command    | Description                                  |
| ---------- | -------------------------------------------- |
| `create`   | Scaffold a new @finografic package           |
| `migrate`  | Sync conventions to an existing package      |
| `features` | Add optional features to an existing package |
| `help`     | Show this help message                       |

### `genx create`

```bash
genx create
```

**Examples:**

```bash
# Create a new package interactively
genx create
```

### `genx migrate`

```bash
genx migrate [path] [options]
```

**Examples:**

```bash
# Dry run in current directory
genx migrate

# Dry run against a specific directory
genx migrate ../my-package

# Apply changes to a directory
genx migrate ../my-package --write

# Only update specific sections
genx migrate --only=package-json,eslint --write

# Update dependencies and Node version
genx migrate --only=dependencies,node --write

# Normalize file names and merge configs
genx migrate --only=renames,merges --write
```

### `genx features`

```bash
genx features
```

**Examples:**

```bash
# Add features to current directory
genx features
```

<!-- GENERATED:USAGE:END -->

---

## 📦 What's Included

Every generated package includes:

### Core Files

- `package.json` - Configured with your scope and name
- `tsconfig.json` - Strict TypeScript config
- `tsdown.config.ts` - Modern bundler setup
- `.gitignore` - Sensible defaults
- `LICENSE` - MIT license
- `README.md` - Basic documentation template

### Development Tools

- **ESLint** - Modern flat config (v9)
- **dprint** - Code formatting
- **Commitlint** - Conventional commits
- **simple-git-hooks** - Pre-commit hooks
- **lint-staged** - Run linters on staged files

### Optional Features

- **Vitest** - Fast unit testing (recommended)
- **GitHub Workflow** - Automated releases
- **AI Rules** - Copilot instructions and guidelines

---

## 🏗️ Generated Structure

```
my-package/
├── .github/
│   ├── workflows/
│   │   └── release.yml
│   ├── copilot-instructions.md  (optional)
│   └── instructions/            (optional)
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
├── eslint.config.ts
├── dprint.jsonc
├── commitlint.config.mjs
├── .simple-git-hooks.mjs
├── .gitignore
├── LICENSE
└── README.md
```

---

## 📋 Commands Reference

| Command          | Description                          | Options                        |
| ---------------- | ------------------------------------ | ------------------------------ |
| `create`         | Scaffold a new @finografic package   | Interactive prompts            |
| `migrate [path]` | Sync conventions to existing package | `--write`, `--only=<sections>` |
| `help`           | Show help message                    | -                              |
| `--help` / `-h`  | Show help (works with commands too)  | -                              |

See `genx <command> --help` for detailed usage.

---

## 🛠️ Development

```bash
# Clone the repo
git clone https://github.com/finografic/genx.git

# Install dependencies
pnpm install

# Build
pnpm build

# Run tests
pnpm test.run
```

### Testing the CLI Locally

#### Option 1: Link Globally (Recommended)

Link the built package globally so you can use `genx` from anywhere:

```bash
# Build and link globally
pnpm link

# Now you can use it from anywhere:
genx create
genx migrate --help
genx help

# When done testing, unlink:
pnpm unlink
```

**Note:** After making changes, rebuild with `pnpm build` and the linked version will automatically use the new build.

#### Option 2: Direct Node Execution

Run the built binary directly:

```bash
# Build first
pnpm build

# Test create (will prompt interactively)
node dist/index.mjs create

# Test migrate (dry-run) in current directory
node dist/index.mjs migrate

# Test migrate (dry-run) against another repo
node dist/index.mjs migrate ../@finografic-core

# Test migrate with --write (be careful!)
node dist/index.mjs migrate ../@finografic-core --write

# Test migrate with --only flag
node dist/index.mjs migrate ../@finografic-core --only=package-json --write

# Test help system
node dist/index.mjs help
node dist/index.mjs --help
node dist/index.mjs create --help
node dist/index.mjs migrate --help
```

#### Option 3: Using pnpm dlx

You can also use `pnpm dlx` from the project root:

```bash
pnpm dlx @finografic/genx create
```

**Note:** `pnpm link` is the fastest for iteration since you only need to rebuild after changes.

### Documentation

- [Developer Workflow](./docs/DEVELOPER_WORKFLOW.md) - Daily development and testing workflow
- [Release Process](./docs/RELEASES.md) - How to cut releases
- [GitHub Packages Setup](./docs/GITHUB_PACKAGES_SETUP.md) - Publishing and consuming packages

---

## License

MIT © [finografic](https://github.com/finografic)
