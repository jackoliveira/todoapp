const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const requireDir = require('require-dir');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');

requireDir('../src/models');
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.set('layout', './shared/layout');

app.use(cors());
app.use('/stylesheets', express.static('src/assets/stylesheets/'));
app.use('/javascripts', express.static('src/assets/javascripts/'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: true}));


module.exports = app;
