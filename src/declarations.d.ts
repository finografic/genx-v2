declare module '@typescript-eslint/eslint-plugin' {
  import type { Linter } from 'eslint';
  const plugin: Linter.Plugin;
  export default plugin;
}
