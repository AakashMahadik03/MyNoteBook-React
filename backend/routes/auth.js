const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'AakashIsaGoodBoy@';
//Route 1: Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post(
  '/createuser',
  [
    // Validation middleware for request body fields
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // If validation errors are present, return a 400 (Bad Request) response with the errors
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if a user with the provided email already exists
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        // If a user with the same email exists, return a 400 (Bad Request) response with an error message
        return res.status(400).json({ error: "Sorry, a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password,salt);
      // Create a new user in the database
      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      });

      const data ={
        User:{
            id : user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET);

      // Respond with the created user
      res.json({authtoken});
    //   res.json(user);
    } catch (error) {
      // Handle any server errors that may occur during the process
      console.error(error); // Log the error for debugging
      return res.status(500).send('internal server error'); // Return a 500 (Internal Server Error) response
    }
  }
);

//Route 2: Authenticate a user using POST "api/auth/login" no login required
router.post(
  '/login',
  [
    // Validation middleware for request body fields
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').exists().withMessage('Password cannot be blank'),

  ],
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // If validation errors are present, return a 400 (Bad Request) response with the errors
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Please try to login with correct credentials"})
      }

      const passwordcompare = await bcrypt.compare(password,user.password);
      if(!( passwordcompare)){
        return res.status(400).json({error:"Please try to login with correct credentials"})
      }

      const data ={
        User:{
            id : user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET);

      res.json({authtoken});
      



    }catch (error) {
      // Handle any server errors that may occur during the process
      console.error(error); // Log the error for debugging
      return res.status(500).send('internal server error'); // Return a 500 (Internal Server Error) response
    }


  })

//Route 3: get login USer Details using"api/auth/getuser" login required
router.post('/getuser', fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      // Handle any server errors that may occur during the process
      console.error(error); // Log the error for debugging
      return res.status(500).send('internal server error'); // Return a 500 (Internal Server Error) response
    }
  })

module.exports = router;