const { createApp } = require('../dist/api-service/main');

let app;

async function getApp() {
  if (!app) {
    app = await createApp({ listen: false });
  }
  return app;
}

module.exports = async function (req, res) {
  const nestApp = await getApp();
  const expressApp = nestApp.getHttpAdapter().getInstance();
  return expressApp(req, res);
};
