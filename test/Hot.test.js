const { describeByWalk, createHotCase } = require('@rspack/test-tools');
const path = require("path");
const tempDir = path.resolve(__dirname, `./js/temp/hot`);

describeByWalk(__filename, (name, src, dist) => {
  createHotCase(name, src, dist, path.join(tempDir, name), 'web');
});
