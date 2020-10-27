const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;
const config = require('./configuration.js');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res, next) {
	res.render('index', { title: 'ohmigosh' });
});
console.log(config.SV_TENANT_TOKEN);
app.listen(port, () => {
	console.log(`Skus-me listening at http://localhost:${port}`);
});
