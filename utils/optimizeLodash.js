// 优化lodash打包
const optimizeLodash = (options) => (config) => {
  if (process.env.NODE_ENV !== "production") {
    return config;
  }

  // https://github.com/lodash/lodash-webpack-plugin
  const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

  if (options) {
    config.plugins.push(new LodashModuleReplacementPlugin(options));
  } else {
    config.plugins.push(new LodashModuleReplacementPlugin());
  }

  return config;
};

module.exports = optimizeLodash;
