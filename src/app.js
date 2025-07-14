const express = require('express')
const app = express();

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// require('./database/pg')
require('./database/mongo')
app.use('/', require('./router'))

module.exports = app;