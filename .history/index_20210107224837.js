// 提取第三方库（暂停用）
const extractVendors = require("./lib/extractVendors");
// 检查命令行是否带有某个参数
const { resolve, getTheme, checkCLIOptions } = require("./lib/utils");
// 抽出第三方库的配置
const getVendorConfig = require("./lib/getVendorConfig");
// 构建显示优化
const buildFriendly = require("./lib/buildFriendly");
// 构建速度分析
const speedMeasure = require("./lib/speedMeasure");
// prerender SPA
const prerender = require("./lib/prerender");
// react-hot-loader
const rewireReactHotLoader = require("./lib/rewireReactHotLoader");
// webpack alias
const getWebpackAlias = require("./lib/getWebpackAlias");
// 开启移动端调试面板
const vConsole = require("./lib/vConsole");
// dropConsole
const dropConsole = require("./lib/dropConsole");
// 增加stylelint
const addStylelint = require("./lib/addStylelint");
// 代码优化压缩: 在react-scripts 3.4.0的基础上增加了去除console的功能
const minimizer = require("./lib/minimizer");
// moduleIds和chunkIds固化
const namedOptimize = require("./lib/namedOptimize");
// 优化lodash打包
const optimizeLodash = require("./lib/optimizeLodash");
// Moment库语言包优化
const optimizeMoment = require("./lib/optimizeMoment");
// 飞冰业务组件按需加载
const rewireThemeIce = require("./lib/rewireThemeIce");
// Fusion组件按需加载（@alifd/next）
const rewireThemeFusion = require("./lib/rewireThemeFusion");
// 合并自定义规则和CRA默认规则
const useEslintConfig = require("./lib/useEslintConfig");

module.exports = {
  extractVendors,
  resolve,
  getTheme,
  checkCLIOptions,
  buildFriendly,
  speedMeasure,
  prerender,
  rewireReactHotLoader,
  getWebpackAlias,
  vConsole,
  addStylelint,
  minimizer,
  dropConsole,
  namedOptimize,
  optimizeLodash,
  optimizeMoment,
  rewireThemeIce,
  rewireThemeFusion,
  getVendorConfig,
  useEslintConfig,
};
