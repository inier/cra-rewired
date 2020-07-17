// 构建显示优化
const buildFriendly = () => (config) => {
  if (process.env.NODE_ENV !== "production") {
    return config;
  }
  // 编译进度图形展示
  // https://github.com/hyunchulkwak/webpack-simple-progress-plugin
  const SimpleProgressPlugin = require("webpack-simple-progress-plugin");

  // 编译结果消息弹出提示
  // https://github.com/RoccoC/webpack-build-notifier
  const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

  config.plugins.push(
    new SimpleProgressPlugin(),
    new WebpackBuildNotifierPlugin({
      suppressSuccess: false,
      suppressCompileStart: false,
      suppressWarning: false,
      activateTerminalOnError: true,
    })
  );

  return config;
};

module.exports = buildFriendly;
