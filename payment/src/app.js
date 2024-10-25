const express = require('express');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// Middleware

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Payment API',
        version: '1.0.0',
        description: 'API for processing payments',
      },
      servers: [{ url: `http://localhost:${PORT}` }],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'], // Path to the files where routes and controllers are defined
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', paymentRoutes); // Prefixing routes with /api

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
