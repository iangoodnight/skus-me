const express = require('express');

const app = express();

const path = require('path');

const port = process.env.PORT || 4000;

const axios = require('axios');

const config = require('./configuration.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.render('index', { title: 'ohmigosh' });
});
app.post('/api', (req, res) => {
  const target = req.body.target || 'ProductCode';
  const value = req.body.value || '';
  axios({
    method: 'POST',
    url: 'https://app.skuvault.com/api/products/getProduct',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: {
      [target]: value,
      TenantToken: config.SV_TENANT_TOKEN,
      UserToken: config.SV_USER_TOKEN,
    },
  }).then((response) => res.json(response.data))
    .catch(() => res.json({ Errors: ['', '', '', ''] }));
});
app.listen(port, () => {
  console.log(`Skus-me listening at http://localhost:${port}`);
});

try {
  module.exports = app;
} catch (error) {
  console.log(`Error exporting app: ${error}`);
}
