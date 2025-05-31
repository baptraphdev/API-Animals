const { animalSchema } = require('../models/animalModel');

// Middleware to validate animal data
const validateAnimal = (req, res, next) => {
  const { error } = animalSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.context.key,
      message: detail.message
    }));
    
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};

// Middleware to validate ID parameter
const validateId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || id.trim() === '') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid ID parameter'
    });
  }
  
  next();
};

module.exports = {
  validateAnimal,
  validateId
};