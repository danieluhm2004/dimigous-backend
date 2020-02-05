module.exports = {
  apps: [
    {
      name: 'Dimigous Backend',
      script: 'dist/index.js',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NAME: '디미라디오',
        PORT: '28190',
        MONGODB_URI: 'mongodb://localhost/dimigous',
        JWT_SECRET: 'INSERT JWT SECRET',
        AWS_ACCESSKEY: 'INSERT ACCESS KEY',
        AWS_SECRETKEY: 'INSERT SECRET KEY',
        NODE_ENV: 'production',
      },
    },
  ],
};
