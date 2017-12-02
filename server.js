//dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

require('./app/routing/apiroutes.js')(app);
require('./app/routing/htmlroutes.js')(app);

app.listen(PORT, function() {
    console.log("listening on PORT: " + PORT);
});