// drop-console-webpack-plugin
const dropConsole = (DROP_CONSOLE = "true") => (config) => {
  if (process.env.NODE_ENV !== "production" || DROP_CONSOLE === "false") {
    return config;
  }

  // https://github.com/AwesomeDevin/drop-console-webpack-plugin
  const DropConsoleWebpackPlugin = require("drop-console-webpack-plugin");
  config.plugins.push(new DropConsoleWebpackPlugin());
  console.log("--- drop console ---");

  return config;
};

module.exports = dropConsole;
