const animalService = require('../services/animalService');

/**
 * Get all animals with optional filtering
 * @route GET /api/animals
 */
const getAnimals = async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit,
      page: req.query.page,
      race: req.query.race,
      minAge: req.query.minAge,
      maxAge: req.query.maxAge,
      sortBy: req.query.sortBy,
      sortDirection: req.query.sortDirection
    };
    
    const animals = await animalService.getAllAnimals(options);
    
    res.status(200).json({
      status: 'success',
      data: animals,
      meta: {
        count: animals.length,
        filters: {
          race: options.race,
          minAge: options.minAge,
          maxAge: options.maxAge
        },
        pagination: {
          page: parseInt(options.page) || 1,
          limit: parseInt(options.limit) || 10
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific animal by ID
 * @route GET /api/animals/:id
 */
const getAnimal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const animal = await animalService.getAnimalById(id);
    
    if (!animal) {
      return res.status(404).json({
        status: 'error',
        message: 'Animal not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: animal
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new animal
 * @route POST /api/animals
 */
const createAnimal = async (req, res, next) => {
  try {
    const animal = await animalService.createAnimal(req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Animal created successfully',
      data: animal
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing animal
 * @route PUT /api/animals/:id
 */
const updateAnimal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const animal = await animalService.updateAnimal(id, req.body);
    
    res.status(200).json({
      status: 'success',
      message: 'Animal updated successfully',
      data: animal
    });
  } catch (error) {
    if (error.message === 'Animal not found') {
      return res.status(404).json({
        status: 'error',
        message: 'Animal not found'
      });
    }
    next(error);
  }
};

/**
 * Delete an animal
 * @route DELETE /api/animals/:id
 */
const deleteAnimal = async (req, res, next) => {
  try {
    const { id } = req.params;
    await animalService.deleteAnimal(id);
    
    res.status(200).json({
      status: 'success',
      message: 'Animal deleted successfully',
      data: { id }
    });
  } catch (error) {
    if (error.message === 'Animal not found') {
      return res.status(404).json({
        status: 'error',
        message: 'Animal not found'
      });
    }
    next(error);
  }
};

module.exports = {
  getAnimals,
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal
};