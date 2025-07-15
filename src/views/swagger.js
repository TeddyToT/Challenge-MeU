const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'API for managing products with PostgreSQL',
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
      },
    ],
  },
  apis: [path.join(__dirname, '..', 'router', 'product', '*.js')],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUiMiddleware: swaggerUi.serve,
  swaggerUiHandler: swaggerUi.setup(swaggerSpec),
};
