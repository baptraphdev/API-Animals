const { getDb } = require('../config/firebase');
const config = require('../config');
const { formatAnimal, formatAnimals } = require('../models/animalModel');

const db = getDb();
const animalsCollection = db.collection(config.collection.animals);

/**
 * Get all animals with optional filtering and pagination
 */
const getAllAnimals = async (options = {}) => {
  try {
    const { 
      limit = 10, 
      page = 1,
      race = null,
      minAge = null,
      maxAge = null,
      sortBy = 'name',
      sortDirection = 'asc'
    } = options;
    
    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Start with base query
    let query = animalsCollection;
    
    // Apply filters if provided
    if (race) {
      query = query.where('race', '==', race);
    }
    
    if (minAge !== null && !isNaN(minAge)) {
      query = query.where('age', '>=', parseInt(minAge));
    }
    
    if (maxAge !== null && !isNaN(maxAge)) {
      query = query.where('age', '<=', parseInt(maxAge));
    }
    
    // Apply sorting
    query = query.orderBy(sortBy, sortDirection);
    
    // Apply pagination
    query = query.limit(parseInt(limit)).offset(parseInt(offset));
    
    // Execute query
    const snapshot = await query.get();
    
    return formatAnimals(snapshot);
  } catch (error) {
    throw new Error(`Error fetching animals: ${error.message}`);
  }
};

/**
 * Get a single animal by ID
 */
const getAnimalById = async (id) => {
  try {
    const doc = await animalsCollection.doc(id).get();
    return formatAnimal(doc);
  } catch (error) {
    throw new Error(`Error fetching animal: ${error.message}`);
  }
};

/**
 * Create a new animal
 */
const createAnimal = async (animalData) => {
  try {
    const docRef = await animalsCollection.add({
      ...animalData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const newAnimal = await docRef.get();
    return formatAnimal(newAnimal);
  } catch (error) {
    throw new Error(`Error creating animal: ${error.message}`);
  }
};

/**
 * Update an existing animal
 */
const updateAnimal = async (id, animalData) => {
  try {
    const animalRef = animalsCollection.doc(id);
    const animal = await animalRef.get();
    
    if (!animal.exists) {
      throw new Error('Animal not found');
    }
    
    await animalRef.update({
      ...animalData,
      updatedAt: new Date()
    });
    
    const updatedAnimal = await animalRef.get();
    return formatAnimal(updatedAnimal);
  } catch (error) {
    throw new Error(`Error updating animal: ${error.message}`);
  }
};

/**
 * Delete an animal
 */
const deleteAnimal = async (id) => {
  try {
    const animalRef = animalsCollection.doc(id);
    const animal = await animalRef.get();
    
    if (!animal.exists) {
      throw new Error('Animal not found');
    }
    
    await animalRef.delete();
    return { id };
  } catch (error) {
    throw new Error(`Error deleting animal: ${error.message}`);
  }
};

module.exports = {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal
};