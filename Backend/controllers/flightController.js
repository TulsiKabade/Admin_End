const Flight = require('../models/Flight');

// Get flights by name
const getFlightsByName = async (req, res) => {
    try {
        const { FlightName } = req.query;  // Get FlightName from query parameters

        // Log received FlightName
        console.log('Received FlightName query:', FlightName);

        // If no FlightName is provided, fetch all flights
        if (!FlightName) {
            const flights = await Flight.find();
            console.log('Fetched all flights:', flights); // Log all flights fetched
            return res.json(flights);
        }

        // Find flights matching the given FlightName (case insensitive)
        const flights = await Flight.find({ FlightName: { $regex: FlightName, $options: 'i' } });
        console.log('Flights found:', flights); // Log flights found with the given name

        if (flights.length === 0) {
            console.log('No flights found with that name:', FlightName); // Log if no flights found
            return res.status(404).json({ message: 'No flights found with that name' });
        }

        res.json(flights);
    } catch (err) {
        console.error('Error fetching flights:', err.message); // Log any errors
        res.status(500).json({ message: err.message });
    }
};




// Create a flight
const createFlight = async (req, res) => {
    const flight = new Flight({
        FlightID:req.body.FlightID,
        FlightName:req.body.FlightName,
        FlightCode:req.body.FlightCode,           
        DepartingCity:req.body.DepartingCity,
        ArrivingCity: req.body.ArrivingCity,
        DepartingTime: req.body.DepartingTime,
        ArrivingTime:req.body.ArrivingTime, 
        Duration: req.body.Duration,
        Price:req.body.Price, 
       
        
    });

    try {
        const newFlight = await flight.save();
        res.status(201).json(newFlight);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a flight
const deleteFlight = async (req, res) => {
    try {
        // Log the incoming request parameters
        console.log('Request Params:', req.params);

        // Log the FlightID that is being used to find the flight
        console.log('Deleting flight with ID:', req.params.FlightID);

        // Attempt to find and delete the flight by FlightID
        const flight = await Flight.findOneAndDelete({ FlightID: req.params.FlightID });

        // Log the result of the deletion attempt
        console.log('Flight found:', flight);

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        // Log successful deletion
        res.json({ message: 'Flight deleted' });
    } catch (err) {
        // Log the error message
        console.error('Error occurred:', err.message);
        res.status(500).json({ message: err.message });
    }
};


module.exports = { getFlightsByName, createFlight, deleteFlight }; 
