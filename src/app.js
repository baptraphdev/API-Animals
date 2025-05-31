const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const errorMiddleware = require('./middleware/errorMiddleware');
const animalRoutes = require('./routes/animalRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logging
app.use(cors()); // CORS support
app.use(express.json()); // JSON body parser

// API routes
app.use('/api/animals', animalRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Service is healthy' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Animal Management API',
    version: '1.0.0',
    endpoints: {
      animals: '/api/animals'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    status: 'error',
    message: 'Resource not found' 
  });
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;