import { nextJsConfig } from '@dt/eslint-config/next-js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    ignores: ['.next/**', 'dist/**', 'build/**', 'node_modules/**'],
  },
];
