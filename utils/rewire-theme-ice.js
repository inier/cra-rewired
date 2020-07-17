// 自动引入飞冰业务组件
const rewireThemeIce = (pkgJSON, modifyVars) => (config) => {
  // 从指定对象中获取theme相关配置
  const { getTheme } = require("./utils");
  // 飞冰主题加载相关
  let theme = getTheme(pkgJSON);

  if (theme && theme.ice) {
    // https://github.com/alibaba/ice/tree/master/tools/webpack-plugin-import
    const WebpackPluginImport = require("webpack-plugin-import");

    config.plugins.push(
      new WebpackPluginImport([
        {
          // ICE 业务组件
          libraryName: new RegExp(`${theme.ice.split("/")[0]}\/.*`),
        },
      ])
    );
  }

  return config;
};

module.exports = rewireThemeIce;
