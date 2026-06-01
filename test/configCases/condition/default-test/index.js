require('./file.mjs');

it('should process mjs files with default test', () => {
  expect(
    __webpack_modules__[require.resolve('./file.mjs')].toString(),
  ).toContain('__prefresh_utils__');
});
