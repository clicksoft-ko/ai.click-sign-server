module.exports = {
  apps: [
    {
      name: 'socket-server',
      exec_mode: 'cluster',
      instances: '2',
      script: 'dist/main.js',
      args: 'start',
      env_prod: {
        NODE_ENV: 'production',
        PORT: 4001,
      },
    },
  ],
};
