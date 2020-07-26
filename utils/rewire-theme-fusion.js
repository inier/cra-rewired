// fusion主题包应用
// https://fusion.design/help.html?spm=fusion-design.home-design-fusion.0.0.7fa84aa0bqwu17#/dev-use-package

const rewireThemeFusion = (
  pkgJSON,
  options = { modifyVars: {}, fast: true }
) => (config) => {
  // 从指定对象中获取theme相关配置
  const { resolve, getTheme } = require("./utils");
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
    const tRules = config.module.rules.filter((item) => {
      return Object.keys(item).includes("oneOf");
    });

    if (tRules.length) {
      // 注入变量编译normalize和icon样式,支持 Object 和 String，
      // String 请写绝对路径，例如: modifyVars: path.join(__dirname, 'variable.scss')
      // Object 如 modifyVars: { '$css-prefix': '"myprefix-"', }
      const tObj = {};
      if (options.modifyVars) {
        tObj.modifyVars = options.modifyVars;
      }

      tRules[0].oneOf.forEach((rule) => {
        const { test } = rule;

        if (checkSass(test)) {
          // 开启fast-sass-loader
          if (options.fast && test.test(sassTest[0])) {
            rule.use.length = 3;
            rule.use.push({
              loader: "fast-sass-loader",
              options: {
                includePaths: [resolve("node_modules"), resolve("src")],
              },
            });
          }

          // 添加 @alifd/next-theme-loader, 引入自定义主题样式对应的 scss 变量
          rule.use.push({
            loader: "@alifd/next-theme-loader",
            options: {
              theme: theme.alifd,
              // 基准包，默认是@alifd/next
              base: "@alifd/next",
              ...tObj,
            },
          });
        }
      });

      // 添加 @alifd/next-theme-webpack-plugin，引入 normalize 样式以及自定义 icon 定义
      config.plugins.push(
        new ThemePlugin({
          theme: theme.alifd,
          // 基准包，默认是@alifd/next
          libraryName: "@alifd/next",
          ...tObj,
        })
      );
    } else {
      // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js
      throw Error("create-react-app打包机制发生重大变更，请升级！");
    }
  }

  return config;
};

module.exports = rewireThemeFusion;
