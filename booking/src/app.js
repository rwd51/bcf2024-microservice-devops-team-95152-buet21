// app.js

const express = require('express');
// rabbitmq connection
const { connectRabbitMQ } = require('./models/rabbitmqClient');
const { startConsumer } = require('./consumers/confirmationConsumer');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Booking API',
        version: '1.0.0',
        description: 'API for managing bookings',
      },
      servers: [{ url: `http://localhost:${PORT}` }],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'], // Adjust paths to match your file structure
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Routes
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api', bookingRoutes);

//first connect to rabbitmq then start the consumer
connectRabbitMQ().then(() => {
    startConsumer();
});

// Start the server

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
