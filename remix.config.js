const { withEsbuildOverride } = require("remix-esbuild-override");
const svgrPlugin = require("@remix-run/esbuild-plugin-svgr");

withEsbuildOverride((option) => {
  option.plugins = [
    svgrPlugin(),
    ...option.plugins, // ajoute les plugins existants
  ];
  return option;
});

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  plugins: [
    svgrPlugin({
      svgoConfig: {
        plugins: [
          { removeViewBox: false }, // Garde la viewBox
          { cleanupIDs: false }, // Ne supprime pas les ID
        ],
      },
    }),
  ],
};
