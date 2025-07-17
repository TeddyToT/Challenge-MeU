const express = require('express')
const app = express();
const { swaggerUiMiddleware, swaggerUiHandler } = require('./views/swagger');

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


require('./database/pg')
// require('./database/mongo')
app.use('/', require('./router'))
app.use('/api-docs', swaggerUiMiddleware, swaggerUiHandler);

module.exports = app;