function getWebpackAlias(pkgJSON) {
  // 从指定对象中获取theme相关配置
  const { resolve, getTheme } = require("./utils");
  const themeObj = getTheme(pkgJSON);
  // 主题名称，根据当前项目使用的主题而定
  let theme = "@alifd/theme-toxic";

  if (themeObj && themeObj.alifd) {
    theme = themeObj.alifd;
  }

  // webpack alias
  /* eslint-disable no-useless-computed-key */
  return {
    // src目录别名
    ["@"]: resolve("src"),
    // api目录别名：接口相关
    ["@api"]: resolve("src/api"),
    // 项目公共资源目录别名
    ["@assets"]: resolve("src/assets"),
    // 项目组件目录别名
    ["@components"]: resolve("src/components"),
    // constants目录别名
    ["@constants"]: resolve("src/constants"),
    // layouts目录别名
    ["@layouts"]: resolve("src/layouts"),
    // hooks目录别名
    ["@hooks"]: resolve("src/hooks"),
    // modules目录别名
    ["@modules"]: resolve("src/modules"),
    // pages目录别名
    ["@pages"]: resolve("src/pages"),
    // routes目录别名
    ["@routes"]: resolve("src/routes"),
    // stores目录别名
    ["@stores"]: resolve("src/stores"),
    // mock目录别名：模拟数据相关
    ["@mock"]: resolve("src/mock"),
    // utils目录别名
    ["@utils"]: resolve("src/utils"),
    // style通用配置文件别名，包括mixins和utils等
    ["@settings"]: resolve("src/settings.scss"),
    // 路由配置文件别名
    ["@routerConfig"]: resolve("src/routerConfig.js"),
    // 主题名称，根据当前项目使用的主题而定
    ["@theme"]: theme,
    // lodash库别名
    ["lodash-es"]: "lodash",
  };
}

module.exports = getWebpackAlias;
