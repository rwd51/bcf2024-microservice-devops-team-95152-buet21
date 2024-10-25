const express = require('express');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const PORT = process.env.PORT || 3000;
// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'User API',
        version: '1.0.0',
        description: 'User Registration and Authentication API',
      },
      servers: [{ url: `http://localhost:${PORT}` }], // Adjust the URL
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'], // Adjust the path to your route and controller files
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRoutes); // Prefixing routes with /api

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
