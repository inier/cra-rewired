// moduleIds和chunkIds固化，优化webpack4的名称变动问题

const NamedOptimize = () => (config) => {
  if (process.env.NODE_ENV !== "production") {
    return config;
  }

  const webpack = require("webpack");
  const hash = require("hash-sum");

  // 固化moduleIds
  config.optimization.moduleIds = "hashed";

  // 固化chunkIds
  config.optimization.chunkIds = "named";

  // 在使用路由懒加载的情况下，chunkIds='named'方式无效，手动修复
  const seen = new Set();

  function hashModule(modules, hashLength = 4) {
    const joinedHash = hash(modules.map((m) => m.id).join("_"));

    let len = hashLength;
    while (seen.has(joinedHash.substr(0, len))) {
      len++;
    }
    seen.add(joinedHash.substr(0, len));
    return joinedHash.substr(0, len);
  }

  config.plugins.push(
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }

      const modules = Array.from(chunk.modulesIterable);
      if (modules.length > 1) {
        return hashModule(modules);
      } else {
        if (modules[0].id.indexOf("/") !== -1) {
          return hashModule(modules);
        }
        return modules[0].id;
      }
    })
  );

  return config;
};

module.exports = NamedOptimize;
