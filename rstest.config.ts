import path from 'node:path';
import { defineConfig } from '@rstest/core';

const root = __dirname;

const testFilter =
  process.argv.includes('--test') || process.argv.includes('-t')
    ? process.argv[
        (process.argv.includes('-t')
          ? process.argv.indexOf('-t')
          : process.argv.indexOf('--test')) + 1
      ]
    : undefined;

export default defineConfig({
  root: __dirname,
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
    __TEST_PATH__: __dirname,
    __TEST_FIXTURES_PATH__: path.resolve(__dirname, 'fixtures'),
    __TEST_DIST_PATH__: path.resolve(__dirname, 'js'),
    __ROOT_PATH__: root,
    __RSPACK_TEST_TOOLS_PATH__: require.resolve('@rspack/test-tools'),
    __RSPACK_PATH__: require.resolve('@rspack/core'),
    DEFAULT_MAX_CONCURRENT: process.argv.includes('--maxConcurrency')
      ? process.argv[process.argv.indexOf('--maxConcurrency') + 1]
      : undefined,
    __DEBUG__: process.env.DEBUG === 'test' ? 'true' : 'false',
  },
});
