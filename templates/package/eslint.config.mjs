import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';


export default [
  js.configs.recommended,

  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  {
    files: ['**/*.ts', '**/*.tsx', './*.mjs'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'simple-import-sort': simpleImportSort,
      'stylistic': stylistic,
    },
    rules: {
      'no-unused-vars': 'off',
      'no-redeclare': 'off',
      'stylistic/semi': 'error',

      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-redeclare': 'warn',

      'no-console': 'warn',

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^@finografic', '^@workspace'],
            ['^\\u0000'],
            [
              '^(lib)',
              '^(utils)',
              '^(types|constants)',
              '^(config)',
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$',
            ],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
];
