const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const { validateAnimal, validateId } = require('../middleware/validationMiddleware');

/**
 * @route GET /api/animals
 * @desc Get all animals with optional filtering
 * @access Public
 */
router.get('/', animalController.getAnimals);

/**
 * @route GET /api/animals/:id
 * @desc Get a single animal by ID
 * @access Public
 */
router.get('/:id', validateId, animalController.getAnimal);

/**
 * @route POST /api/animals
 * @desc Create a new animal
 * @access Public
 */
router.post('/', validateAnimal, animalController.createAnimal);

/**
 * @route PUT /api/animals/:id
 * @desc Update an existing animal
 * @access Public
 */
router.put('/:id', validateId, validateAnimal, animalController.updateAnimal);

/**
 * @route DELETE /api/animals/:id
 * @desc Delete an animal
 * @access Public
 */
router.delete('/:id', validateId, animalController.deleteAnimal);

module.exports = router;