const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST route to add a new contact query
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact query submitted successfully.' });
  } catch (error) {
    console.error('Error saving contact query:', error);
    res.status(500).json({ error: 'Failed to submit contact query.' });
  }
});

// GET route to fetch all contact queries
router.get('/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contact queries:', error);
    res.status(500).json({ error: 'Failed to fetch contact queries.' });
  }
});

// Export the router
module.exports = router;
