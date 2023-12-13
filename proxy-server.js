const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3001; // Choose any available port

app.use(cors());

// Proxy specific routes to the target API
app.use(
  '/sunbase',
  createProxyMiddleware({
    target: 'http://qa2.sunbasedata.com',
    changeOrigin: true,
    pathRewrite: {
      '^/sunbase': '/sunbase/portal/api', // Adjust the path as needed
    },
  })
);

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
