// 提取第三方库（暂停用）
// const extractVendors = require('./utils/extractVendors');
// 检查命令行是否带有某个参数
const { checkCLIOptions } = require("./utils/utils");
// 抽出第三方库的配置
const getVendorConfig = require("./utils/getVendorConfig");
// 构建显示优化
const buildFriendly = require("./utils/buildFriendly");
// 构建速度分析
const speedMeasure = require("./utils/speedMeasure");
// prerender SPA
const prerender = require("./utils/prerender");
// react-hot-loader
const rewireReactHotLoader = require("./utils/rewireReactHotLoader");
// webpack alias
const getWebpackAlias = require("./utils/getWebpackAlias");
// 开启移动端调试面板
const vConsole = require("./utils/vConsole");
// dropConsole
const dropConsole = require("./utils/dropConsole");
// 增加stylelint
const addStylelint = require("./utils/addStyleLint");
// 代码优化压缩: 在react-scripts 3.4.0的基础上增加了去除console的功能
const minimizer = require("./utils/minimizer");
// moduleIds和chunkIds固化
const namedOptimize = require("./utils/namedOptimize");
// 优化lodash打包
const optimizeLodash = require("./utils/optimizeLodash");
// Moment库语言包优化
const optimizeMoment = require("./utils/optimizeMoment");
// 飞冰业务组件按需加载
const rewireThemeIce = require("./utils/rewire-theme-ice");
// Fusion组件按需加载（@alifd/next）
const rewireThemeFusion = require("./utils/rewire-theme-fusion");

module.exports = {
  // extractVendors,
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
};
