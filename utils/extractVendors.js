// 提取第三方库（暂停用）
const extractVendors = () => (config) => {
  if (process.env.NODE_ENV !== "production") {
    return config;
  }

  const fs = require("fs");
  const { resolve } = require("./utils");

  //从根目录获取
  const appVendorsPath = resolve("src/vendorConfig.js");

  const tExtractVendors = () => {
    if (!fs.existsSync(appVendorsPath)) {
      return null;
    }
    const vendors = require(appVendorsPath);
    console.log("--- extractVendors ---");
    console.log(vendors);
    if (Array.isArray(vendors)) {
      if (vendors.length === 0) {
        return null;
      }
      if (Array.isArray(vendors[0])) {
        vendors.forEach((vendor) => {
          if (!Array.isArray(vendor)) {
            throw new Error("Wrong vendors");
          }
        });
        // vendors are defined as: [['moduleA', 'moduleB'], ['moduleC', 'moduleD']]
        const outputVendors = {};
        vendors.forEach((vendor, index) => {
          outputVendors[`vendor${index}`] = vendor;
        });
        return outputVendors;
      } else {
        vendors.forEach((vendor) => {
          if (!(typeof vendor === "string")) {
            throw new Error("Wrong vendors");
          }
        });
        // vendors are defined as: ['moduleA', 'moduleB']
        return { vendors };
      }
    } else if (typeof vendors === "object") {
      // vendors are defined as: { vendorA: ['moduleA', 'moduleB'] }
      return vendors;
    } else {
      throw new Error("Wrong vendors");
    }
  };

  config.entry = { ...config.entry, ...(tExtractVendors() || {}) };

  return config;
};

module.exports = extractVendors;
