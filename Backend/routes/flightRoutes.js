const express = require('express');
const { getFlightsByName, createFlight, deleteFlight } = require('../controllers/flightController');
const router = express.Router();

// Merge the getFlights and getFlightsByName into a single route
router.get('/', getFlightsByName);  // This route handles both getting all flights and by name

// Add a flight
router.post('/', createFlight);

// Delete a flight
router.delete('/:FlightID', deleteFlight);

module.exports = router;
