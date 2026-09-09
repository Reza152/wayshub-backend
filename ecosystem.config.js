module.exports = {
  apps: [
    {
      name: "wayshub-backend",
      script: "index.js",
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: "production",
        PORT: 5000
      }
    }
  ]
};
