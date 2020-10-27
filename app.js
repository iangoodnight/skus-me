const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res, next) {
	res.render('index', { title: 'ohmigosh' });
});
app.listen(port, () => {
	console.log(`Skus-me listening at http://localhost:${port}`);
});
