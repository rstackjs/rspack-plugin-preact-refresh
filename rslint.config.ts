import { defineConfig, globalIgnores, js, ts } from '@rslint/core';

export default defineConfig([
  globalIgnores(['test/hotCases/**']),
  js.configs.recommended,
  ts.configs.recommended,
  {
    files: ['client/**/*', 'test/**/*'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
    },
  },
]);
