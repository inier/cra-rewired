// 合并自定义规则和CRA默认规则
// 解决 customize-cra 0.9.1 对于eslint的引入存在自定义不生效的bug
// see: https://github.com/arackaf/customize-cra/issues/175#issuecomment-610023655
const fs = require("fs");
const eslintrcFilePath = process.cwd() + "/.eslintrc.js";
let eslintrcContent = {};

if (fs.existsSync(eslintrcFilePath)) {
  eslintrcContent = require(eslintrcFilePath);
}

const useEslintConfig = (eslintConfig) => (config) => {
  const updatedRules = config.module.rules.map((rule) => {
    // Only target rules that have defined a `useEslintrc` parameter in their options
    if (
      rule.use &&
      rule.use.some((use) => use.options && use.options.useEslintrc !== void 0)
    ) {
      const ruleUse = rule.use[0];
      const baseOptions = ruleUse.options;
      const baseConfig = baseOptions.baseConfig || {};
      const newOptions = {
        useEslintrc: false,
        ignore: true,
        baseConfig: { ...baseConfig, ...(eslintConfig || eslintrcContent) },
      };

      ruleUse.options = newOptions;

      return rule;

      // Rule not using eslint. Do not modify.
    } else {
      return rule;
    }
  });

  config.module.rules = updatedRules;

  return config;
};

module.exports = useEslintConfig;
