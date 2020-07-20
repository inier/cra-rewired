const path = require("path");
// const paths = require('react-app-rewired/scripts/utils/paths');

const resolve = (str) => {
  //return path.join(paths.appPath, str);
  return path.resolve(process.cwd(), "./", str);
};

/**
 * 检查命令行是否带有指定的flag标记
 * @param {String} flag 标记
 * @returns {Boolean} 是否带有标记
 */
function checkCLIOptions(flag) {
  if (process.argv.includes(flag)) {
    return true;
  }
  return false;
}

// 获取 package.json 中的主题配置信息
function getTheme({ buildConfig }) {
  try {
    if (buildConfig && buildConfig.theme) {
      return buildConfig.theme;
    }
    return null;
  } catch (e) {
    console.error("getTheme:", e);
    console.log(
      `请在 package.json 中配置
            "buildConfig":{
                "theme": {
                    "ice": "@icedesign/xxx",
                    "alifd": "@alifd/xxx",
                }
            }`
    );
  }
}

module.exports = {
  resolve,
  checkCLIOptions,
  getTheme,
};
