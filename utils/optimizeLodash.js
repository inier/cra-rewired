// 优化lodash打包
const optimizeLodash = () => (config) => {
  if (process.env.NODE_ENV !== "production") {
    return config;
  }
  // https://github.com/lodash/lodash-webpack-plugin
  const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
  config.plugins.push(new LodashModuleReplacementPlugin());

  return config;
};

module.exports = optimizeLodash;
