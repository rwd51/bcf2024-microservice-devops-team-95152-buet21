const express = require('express');
const trainSchedule = require('./routes/trainSchedule');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
// Swagger setup

const PORT = process.env.PORT || 3000;
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Train Schedule API',
        version: '1.0.0',
        description: 'API for retrieving train schedules and details',
      },
      servers: [{ url: `http://localhost:${PORT}` }],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'], // Adjust to match your file structure
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));




// Middleware
app.use(express.json());

// Routes
app.use('/api', trainSchedule);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

