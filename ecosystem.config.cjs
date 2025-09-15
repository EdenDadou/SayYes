module.exports = {
  apps: [
    {
      name: "remix-app",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
        DATABASE_URL: "file:./prisma/dev.db",
      },
      // Configuration pour la gestion des erreurs et redémarrages
      max_memory_restart: "1G",
      instances: 1,
      exec_mode: "fork",
      // Logs
      log_file: "./logs/app.log",
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      // Redémarrage automatique
      watch: false,
      ignore_watch: ["node_modules", "logs", "prisma/dev.db*"],
    },
  ],
};
