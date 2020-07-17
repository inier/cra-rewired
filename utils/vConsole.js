// 开启vconsole移动端调试
// https://github.com/diamont1001/vconsole-webpack-plugin

const vConsole = (VCONSOLE = "false") => (config) => {
  const { checkCLIOptions } = require("./utils");
  if (VCONSOLE === "false" || !checkCLIOptions("--debug")) {
    return config;
  }

  const VConsolePlugin = require("vconsole-webpack-plugin");

  config.plugins.push(
    new VConsolePlugin({
      enable: VCONSOLE === "true" || checkCLIOptions("--debug"),
    })
  );

  console.log("--- enable vConsole ---");
  return config;
};

module.exports = vConsole;
