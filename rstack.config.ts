// Configuration guide: https://rstack.rs/config
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { define } from 'rstack';

const require = createRequire(import.meta.url);
const root = import.meta.dirname;

define.lib({
  dts: true,
  format: 'esm',
  syntax: 'es2023',
});

const testFilter =
  process.argv.includes('--test') || process.argv.includes('-t')
    ? process.argv[
        (process.argv.includes('-t')
          ? process.argv.indexOf('-t')
          : process.argv.indexOf('--test')) + 1
      ]
    : undefined;

define.test({
  extends: {},
  root,
  globals: true,
  setupFiles: [
    '@rspack/test-tools/setup-env',
    '@rspack/test-tools/setup-expect',
  ],
  env: {
    RSPACK_HOT_TEST: 'true',
    RUST_BACKTRACE: 'full',
    updateSnapshot:
      process.argv.includes('-u') || process.argv.includes('--updateSnapshot')
        ? 'true'
        : 'false',
    RSPACK_DEV: 'false',
    testFilter,
    printLogger: process.env.DEBUG === 'test' ? 'true' : 'false',
    __TEST_PATH__: root,
    __TEST_FIXTURES_PATH__: resolve(root, 'fixtures'),
    __TEST_DIST_PATH__: resolve(root, 'js'),
    __ROOT_PATH__: root,
    __RSPACK_TEST_TOOLS_PATH__: require.resolve('@rspack/test-tools'),
    __RSPACK_PATH__: require.resolve('@rspack/core'),
    DEFAULT_MAX_CONCURRENT: process.argv.includes('--maxConcurrency')
      ? process.argv[process.argv.indexOf('--maxConcurrency') + 1]
      : undefined,
    __DEBUG__: process.env.DEBUG === 'test' ? 'true' : 'false',
  },
});

define.fmt({
  ignorePatterns: ['test/hotCases/**'],
  plugins: ['heading-case'],
  singleQuote: true,
});

define.staged({
  '*.{js,jsx,ts,tsx,mjs,cjs}': ['rs lint --type-check', 'rs fmt'],
});

define.lint(({ globalIgnores, js, ts }) => [
  globalIgnores(['test/hotCases/**']),
  js.configs.recommended,
  ts.configs.recommended,
  {
    files: ['client/**/*', 'test/**/*'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]);
