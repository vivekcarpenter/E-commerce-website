const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://e-commerce-website-xatf.onrender.com',
      changeOrigin: true,
      secure: false,
    })
  );
};
