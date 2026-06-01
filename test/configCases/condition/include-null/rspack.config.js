const { PreactRefreshRspackPlugin } = require('../../../../dist/index.js');

/** @type {import('@rspack/core').Configuration} */
module.exports = {
  mode: 'development',
  target: 'web',
  context: __dirname,
  entry: './index.js',
  plugins: [
    new PreactRefreshRspackPlugin({
      include: null,
    }),
  ],
};
