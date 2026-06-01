require('./file');

it('should omit null include when compiling', () => {
  expect(
    __webpack_modules__[require.resolve('./file.js')].toString(),
  ).toContain('__prefresh_utils__');
});
