module.exports = {
  apps: [
    {
      name: 'jueblog-frontend',
      script: 'npm run dev',
    },
    {
      name: 'jueblog-api',
      script: './server/index.js',
    },
  ],
}
