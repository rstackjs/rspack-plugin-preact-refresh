require('./file.mjs');
require('./not_node_modules/file.js');

it('should process mjs files with default test', () => {
  expect(
    __webpack_modules__[require.resolve('./file.mjs')].toString(),
  ).toContain('__prefresh_utils__');
});

it('should only exclude node_modules path segments by default', () => {
  expect(
    __webpack_modules__[
      require.resolve('./not_node_modules/file.js')
    ].toString(),
  ).toContain('__prefresh_utils__');
});
