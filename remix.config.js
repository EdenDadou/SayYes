const { withEsbuildOverride } = require("remix-esbuild-override");
const svgrPlugin = require("@remix-run/esbuild-plugin-svgr");

withEsbuildOverride((option, { isServer }) => {
  option.plugins = [
    svgrPlugin(),
    ...option.plugins, // ajoute les plugins existants
  ];
  return option;
});

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
};
