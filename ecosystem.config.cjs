module.exports = {
  apps: [
    {
      name: "remix-app",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },
    },
  ],
};
