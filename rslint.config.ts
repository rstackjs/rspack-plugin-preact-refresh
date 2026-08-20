import { defineConfig, globalIgnores, globals, js, ts } from '@rslint/core';

export default defineConfig([
  globalIgnores(['test/hotCases/**']),
  js.configs.recommended,
  ts.configs.recommended,
  {
    files: ['client/**/*'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.rspack,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['test/**/*'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.rstest,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['test/configCases/**/*.js'],
    languageOptions: {
      globals: globals.rspack,
    },
  },
]);
