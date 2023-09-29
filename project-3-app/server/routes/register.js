const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the user schema
const { validateUserRegistration } = require('../util/validateUser'); // Import utility functions

// Define the registration endpoint
    router.post('/register', async (req, res) => {
        try {
          const { name, email, password } = req.body;
      
          // Validate user registration data using the utility function
          const validationErrors = validateUserRegistration(name, email, password);
      
          if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
          }
      
          // Check if the email or username is already registered
          const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      
          if (existingUser) {
            return res.status(400).json({ error: 'Email or username is already registered' });
          }
      
          // If all validation checks pass, create a new user and save it to the database
          const newUser = new User({ name, email, password });
          await newUser.save();
      
          // Respond with a success message or other appropriate response
          res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
      
      module.exports = router;