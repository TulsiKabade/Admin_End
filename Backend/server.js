const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const flightRoutes = require('./routes/flightRoutes');
const contactRoutes = require('./routes/contactRoutes');
const bookingRoutes = require("./routes/bookingRoutes"); 


require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Flight routes
app.use('/api/flights', flightRoutes);

//contact routes
app.use('/api', contactRoutes);

app.use("/api", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
