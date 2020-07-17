// == PRERENDER SPA PLUGIN == //
const prerender = () => (config) => {
  const { resolve, checkCLIOptions } = require("./utils");
  if (
    process.env.NODE_ENV !== "production" ||
    !checkCLIOptions("--prerender")
  ) {
    return config;
  }

  const PrerenderSPAPlugin = require("prerender-spa-plugin");
  const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
  config.plugins.push(
    new PrerenderSPAPlugin({
      // Index.html is in the root directory.
      staticDir: resolve("build"),
      routes: ["/", "/list", "/base"],
      outputDir: resolve("build/prerendered"),
      // Optional minification.
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true,
      },

      renderer: new Renderer({
        renderAfterTime: 500,
      }),
    })
  );

  return config;
};

module.exports = prerender;
