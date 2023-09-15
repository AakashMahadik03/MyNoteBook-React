const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 3: get all Notes using"api/auth/fetchallnotes" login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // Handle any server errors that may occur during the process
    console.error(error); // Log the error for debugging
    return res.status(500).send("internal server error"); // Return a 500 (Internal Server Error) response
  }
});

//Route 3: add new Notes using"api/auth/addnote" login required
router.get(
  "/addnote",
  fetchuser,
  [
    body("title", "Title is Required").not().isEmpty(),
    body("description", "description must be of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { title, description, tag } = req.body;

    if (!errors.isEmpty()) {
      // If validation errors are present, return a 400 (Bad Request) response with the errors
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new Notes({
        title: title,
        description: description,
        tag: tag,
        user: req.user.id,  
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      // Handle any server errors that may occur during the process
      console.error(error); // Log the error for debugging
      return res.status(500).send("internal server error"); // Return a 500 (Internal Server Error) response
    }
  }
);
module.exports = router;
