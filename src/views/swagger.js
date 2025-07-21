const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Challenge MeU - API",
      version: "1.0.0",
      description: "API for managing Node.js Challenge Project with JWT",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:8000/api",
      },
    ],
  },
  apis: [path.join(__dirname, "..", "router", "api", "*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUiMiddleware: swaggerUi.serve,
  swaggerUiHandler: swaggerUi.setup(swaggerSpec),
};
