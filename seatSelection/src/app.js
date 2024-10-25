const express = require('express');
const seatRoutes = require('./routes/seatRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const PORT = process.env.PORT || 3000;
// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Seat Reservation API',
        version: '1.0.0',
        description: 'API for seat availability and reservations',
      },
      servers: [{ url: `http://localhost:${PORT}` }],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'], // Path to the files where routes are defined
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', seatRoutes); // Prefixing routes with /api

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 