require('./file');

it("should exclude selected file when compiling", () => {
  expect(__webpack_modules__[require.resolve('./file.js')].toString())
    .not.toContain('__prefresh_utils__');
});
