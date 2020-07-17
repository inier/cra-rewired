// fusion主题包应用
const rewireThemeFusion = (pkgJSON, modifyVars) => (config) => {
  // 从指定对象中获取theme相关配置
  const { getTheme } = require("./utils");
  // Fusion主题加载相关
  let theme = getTheme(pkgJSON);

  if (theme && theme.alifd) {
    // https://github.com/alibaba-fusion/next-theme-webpack-plugin
    const ThemePlugin = require("@alifd/next-theme-webpack-plugin");
    const sassTest = [".scss", ".module.scss"];
    const checkSass = (reg) => {
      if (!reg || Array.isArray(reg)) {
        return false;
      }

      return !!sassTest.filter((item) => {
        return reg.test(item);
      }).length;
    };
    const sassRules = config.module.rules.filter((item) => {
      return Object.keys(item).includes("oneOf");
    });

    if (sassRules.length) {
      sassRules[0].oneOf.forEach((rule) => {
        const { test } = rule;

        if (checkSass(test)) {
          // 开启fast-sass-loader
          // if (test.test(sassTest[0])) {
          //   rule.use.length = 3;
          //   rule.use.push("fast-sass-loader");
          // }
          rule.use.push({
            // 添加 @alifd/next-theme-loader
            loader: "@alifd/next-theme-loader",
            options: {
              theme: theme.alifd,
            },
          });
          // console.log("sass-rule:", rule.use);
        }
      });

      // 注入变量编译normalize和icon样式
      // 支持 Object 和 String，如果是 String 请写绝对路径，例如: modifyVars: path.join(__dirname, 'variable.scss')
      // Object如 { '$css-prefix': '"myprefix-"', }
      // modifyVars: modifyVars,
      const tObj = {};
      if (modifyVars) {
        tObj.modifyVars = modifyVars;
      }

      // 添加 @alifd/next-theme-webpack-plugin，引入 normalize 样式以及自定义 icon 定义
      config.plugins.push(
        new ThemePlugin({
          theme: theme.alifd,
          ...tObj,
        })
      );
    } else {
      // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js
      throw Error("create-react-app打包机制发生重大变更，请确认！");
    }
  }

  return config;
};

module.exports = rewireThemeFusion;
