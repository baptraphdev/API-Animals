const Joi = require('joi');

// Animal schema validation using Joi
const animalSchema = Joi.object({
  name: Joi.string().required().min(1).max(100)
    .message({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 1 character long',
      'string.max': 'Name cannot exceed 100 characters'
    }),
  age: Joi.number().required().min(0).max(200)
    .message({
      'number.base': 'Age must be a number',
      'number.min': 'Age must be at least 0',
      'number.max': 'Age cannot exceed 200'
    }),
  race: Joi.string().required().min(1).max(100)
    .message({
      'string.empty': 'Race is required',
      'string.min': 'Race must be at least 1 character long',
      'string.max': 'Race cannot exceed 100 characters'
    }),
  address: Joi.string().required().min(5).max(200)
    .message({
      'string.empty': 'Address is required',
      'string.min': 'Address must be at least 5 characters long',
      'string.max': 'Address cannot exceed 200 characters'
    })
});

// Format Firestore document to animal object
const formatAnimal = (doc) => {
  if (!doc.exists) return null;
  
  return {
    id: doc.id,
    ...doc.data()
  };
};

// Format multiple animal documents
const formatAnimals = (snapshot) => {
  return snapshot.docs.map(doc => formatAnimal(doc));
};

module.exports = {
  animalSchema,
  formatAnimal,
  formatAnimals
};