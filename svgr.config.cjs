module.exports = {
  typescript: true,
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
  svgoConfig: {
    plugins: [
      {
        name: "removeViewBox",
        active: false,
      },
    ],
  },
};
