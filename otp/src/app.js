const express = require('express');
const otpRoutes = require('./routes/otpRoutes');
const { connectRabbitMQ } = require('./models/rabbitmqClient'); // Import RabbitMQ client
const app = express();
const PORT = process.env.PORT || 3000;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'OTP API',
        version: '1.0.0',
        description: 'API for generating and verifying OTP',
      },
      servers: [{ url: `http://localhost:${PORT}` }],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'], // Path to your route and controller files
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Connect to RabbitMQ
connectRabbitMQ();
// Routes
app.use('/api', otpRoutes); // Prefixing routes with /api

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
