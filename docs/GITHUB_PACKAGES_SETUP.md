# GitHub Packages Setup Guide

Complete guide for publishing and consuming GitHub Packages in the @finografic ecosystem.

> **Note:** This guide documents the EXACT steps needed. GitHub's official docs and AI assistants often provide incomplete or incorrect instructions.

---

## Part 1: Publishing a Package to GitHub Packages

### Overview

Publishing to GitHub Packages requires:

1. Repository permissions configured
2. Personal Access Token (PAT) created
3. Local `.npmrc` configured
4. `package.json` publishConfig set
5. GitHub Actions workflow configured

---

### Step 1: Repository Settings

#### Actions Permissions

Go to: `https://github.com/finografic/{repo}/settings/actions`

**Required Settings:**

- [ ] TODO: [Add exact settings here]

#### Workflow Permissions

**Required Settings:**

- [ ] TODO: [Add exact settings here]

---

### Step 2: Personal Access Token (PAT)

**Where to Create:**

1. Go to: <https://github.com/settings/tokens>
2. Click "Generate new token" → "Classic"
3. Set expiration (recommend: No expiration for CI)
4. Select scopes:
   - [ ] TODO: [Add exact scopes needed]

**Token Storage:**

- [ ] TODO: [Where to save token - secrets, environment, etc.]

---

### Step 3: Local `.npmrc` Configuration

Create/update `.npmrc` in project root:

```ini
# TODO: Add exact .npmrc content
```

**Important:**

- [ ] TODO: [Any gotchas or common mistakes]

---

### Step 4: `package.json` Configuration

Required fields:

```json
{
  "name": "@finografic/package-name",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/finografic/package-name.git"
  }
}
```

---

### Step 5: GitHub Actions Workflow

See `.github/workflows/release.yml`:

**Key Configuration:**

```yaml
# TODO: Highlight critical settings
```

**Secrets Required:**

- [ ] TODO: [Which secrets, where to set them]

---

### Step 6: Test the Release

```bash
pnpm release.github.patch
```

**Verify:**

1. [ ] Workflow runs successfully
2. [ ] Package appears in Packages tab
3. [ ] GitHub Release created

---

## Part 2: Consuming a GitHub Package

### Overview

To install a package from GitHub Packages in another project.

---

### Step 1: Authentication Setup

#### Option A: User-level `.npmrc`

Create `~/.npmrc` (global):

```ini
# TODO: Add global .npmrc content
```

#### Option B: Project-level `.npmrc`

Create `.npmrc` in project root:

```ini
# TODO: Add project .npmrc content
```

**Security Note:**

- [ ] TODO: [Best practices for token storage]

---

### Step 2: Install the Package

```bash
pnpm add @finografic/core
```

**Common Issues:**

- [ ] TODO: [404 errors and solutions]
- [ ] TODO: [Auth failures and solutions]

---

### Step 3: Using the Package

```typescript
import { something } from '@finografic/core';
```

---

## Part 3: Common Issues & Solutions

### Issue: 404 Not Found

**Cause:**

- [ ] TODO: [Common causes]

**Solution:**

```bash
# TODO: Add solution commands
```

---

### Issue: Unauthorized / 401

**Cause:**

- [ ] TODO: [Auth issues]

**Solution:**

- [ ] TODO: [Fix steps]

---

### Issue: Package Not Found in Registry

**Cause:**

- [ ] TODO: [Registry issues]

**Solution:**

- [ ] TODO: [Fix steps]

---

## Part 4: Multi-Package Setup

For packages that depend on other @finografic packages:

### Example: @finografic/create depends on @finografic/core

**In @finografic/create:**

```json
{
  "dependencies": {
    "@finografic/core": "^0.7.12"
  }
}
```

**Requirements:**

- [ ] TODO: [What needs to be configured]

---

## Testing Checklist

Before considering setup complete:

- [ ] Can publish package via workflow
- [ ] Package appears in GitHub Packages
- [ ] Can install package in another project
- [ ] Can import and use package
- [ ] Dependency resolution works for packages depending on other @finografic packages

---

## Reference Links

- GitHub Packages Docs: <https://docs.github.com/en/packages>
- npm Scopes: <https://docs.npmjs.com/cli/v8/using-npm/scope>
- GitHub Actions Permissions: <https://docs.github.com/en/actions/security-guides/automatic-token-authentication>

---

## Notes

Things that GitHub Copilot/AI got wrong:

- [ ] TODO: [Common misinformation encountered]

Hard-won lessons:

- [ ] TODO: [Things you wish you knew earlier]
