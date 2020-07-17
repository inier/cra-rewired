// 构建速度分析
const speedMeasure = () => (config) => {
  const { checkCLIOptions } = require("./utils");
  if (process.env.NODE_ENV !== "production" || !checkCLIOptions("--smp")) {
    return config;
  }

  //https://github.com/stephencookdev/speed-measure-webpack-plugin
  const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
  const smp = new SpeedMeasurePlugin();

  return smp.wrap(config);
};

module.exports = speedMeasure;
