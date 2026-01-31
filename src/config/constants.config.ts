// NOTE: Shared constants used across create/migrate/features flows.

// ─────────────────────────────────────────────────────────────────────────────
// Filenames
// ─────────────────────────────────────────────────────────────────────────────

export const PACKAGE_JSON = 'package.json';

export const ESLINT_CONFIG_FILES = [
  'eslint.config.ts',
  'eslint.config.mjs',
  'eslint.config.cjs',
  'eslint.config.js',
] as const;

export const VSCODE_DIR = '.vscode';
export const VSCODE_SETTINGS_JSON = 'settings.json';
export const VSCODE_EXTENSIONS_JSON = 'extensions.json';

// ─────────────────────────────────────────────────────────────────────────────
// package.json scripts formatting
// ─────────────────────────────────────────────────────────────────────────────

export const PACKAGE_JSON_SCRIPTS_SECTION_PREFIX = '··········';

export const PACKAGE_JSON_SCRIPTS_SECTION_DIVIDER =
  '················································';
