module.exports = {
  typescript: true,
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false, // Garde le viewBox pour la responsivité
            removeUselessStrokeAndFill: false, // Garde les styles pour la personnalisation
          },
        },
      },
      "removeDimensions", // Supprime width/height pour rendre responsive
      "sortAttrs", // Optimise l'ordre des attributs
    ],
  },
  // Optimisations supplémentaires
  replaceAttrValues: {
    "#000": "currentColor", // Permet la personnalisation des couleurs
  },
  svgProps: {
    "aria-hidden": "true", // Améliore l'accessibilité
  },
};
