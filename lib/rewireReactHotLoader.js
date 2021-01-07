// react-hot-loader
const rewireReactHotLoader = () => (config, env) => {
  if (process.env.NODE_ENV !== "development") {
    return config;
  }
  // https://www.npmjs.com/package/react-hot-loader
  // https://github.com/cdharris/react-app-rewire-hot-loader
  const tRewireReactHotLoader = require("react-app-rewire-hot-loader");
  config = tRewireReactHotLoader(config, env);

  return config;
};

module.exports = rewireReactHotLoader;
