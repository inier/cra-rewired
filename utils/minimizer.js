// 代码优化压缩: 在react-scripts 2.1.5的基础上增加了去除console的功能
const minimizer = ({ drop_console = true }) => (config) => {
  if (process.env.NODE_ENV !== "production") {
    return config;
  }
  // Source maps are resource heavy and can cause out of memory issue for large source files.
  const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
  // https://github.com/webpack-contrib/terser-webpack-plugin
  const TerserPlugin = require("terser-webpack-plugin");
  const tMinimizer = config.optimization.minimizer;
  for (let i = 0; i < tMinimizer.length; i++) {
    if (tMinimizer[i] instanceof TerserPlugin) {
      config.optimization.minimizer[0] = new TerserPlugin({
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
            drop_console: drop_console,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: shouldUseSourceMap,
      });

      console.log("--- 去除console ---");
      break;
    }
  }

  return config;
};

module.exports = minimizer;
