const express = require('express');
const router = express.Router()
const people = require('../controllers/people');
const {planetController} = require('../controllers/planet');
const { filmController } = require('../controllers/film');
const { speciesController } = require('../controllers/species');
const { starshipController } = require('../controllers/starship');
const { vehicleController } = require('../controllers/vehicle');
router.use('/people', people)
router.use('/planet', planetController)
router.use('/film', filmController)
router.use('/species', speciesController)
router.use('/starship', starshipController)
router.use('/vehicle', vehicleController)
// Add more routes here if you want!
module.exports = router