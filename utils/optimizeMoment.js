// 优化lodash打包
const optimizeMoment = (lang = "zh-cn") => (config) => {
  if (process.env.NODE_ENV !== "production") {
    return config;
  }
  // https://github.com/iamakulov/moment-locales-webpack-plugin
  // https://github.com/moment/moment/tree/develop/locale
  const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
  config.plugins.push(
    new MomentLocalesPlugin({
      localesToKeep: [lang],
    })
  );

  return config;
};

module.exports = optimizeMoment;
