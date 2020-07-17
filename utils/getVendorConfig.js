// 提取第三方库
// Bundle Splitting
// https://webpack.docschina.org/configuration/optimization/#optimization-splitchunks

module.exports = (vendorConfig = {}) => (config) => {
  return {
    chunks: "all",
    minSize: 30000, // 大于30KB
    minChunks: 1,
    maxAsyncRequests: 3,
    maxInitialRequests: 3,
    cacheGroups: {
      // 将公共的包提取到 chunk-vendors
      vendors: {
        name: `chunk-vendors`,
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: "initial",
      },
      common: {
        name: `chunk-common`,
        minChunks: 2,
        priority: -20,
        chunks: "initial",
        reuseExistingChunk: true,
      },
    },
    ...vendorConfig,
  };
};
