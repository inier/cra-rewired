// 构建速度分析
const speedMeasure = (options) => (config) => {
  const { checkCLIOptions } = require("./utils");
  if (process.env.NODE_ENV !== "production" || !checkCLIOptions("--smp")) {
    return config;
  }

  //https://github.com/stephencookdev/speed-measure-webpack-plugin
  const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
  let smp = new SpeedMeasurePlugin();

  if (options) {
    smp = new SpeedMeasurePlugin(options);
  }

  return smp.wrap(config);
};

module.exports = speedMeasure;
