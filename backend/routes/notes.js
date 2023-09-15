const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: Get all Notes using "api/notes/fetchallnotes" (login required)
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // Handle any server errors that may occur during the process
    console.error(error); // Log the error for debugging
    return res.status(500).send("Internal Server Error"); // Return a 500 (Internal Server Error) response
  }
});

// Route 2: Add a new Note using "api/notes/addnote" (login required)
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title is Required").not().isEmpty(),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { title, description, tag } = req.body;

      if (!errors.isEmpty()) {
        // If validation errors are present, return a 400 (Bad Request) response with the errors
        return res.status(400).json({ errors: errors.array() });
      }

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
      return res.status(500).send("Internal Server Error"); // Return a 500 (Internal Server Error) response
    }
  }
);

// Route 3: Update a Note using "api/auth/updatenote/:id" (login required)
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Create a new object to hold the updated fields
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find a note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "No Note Found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    // Handle any server errors that may occur during the process
    console.error(error); // Log the error for debugging
    return res.status(500).send("Internal Server Error"); // Return a 500 (Internal Server Error) response
  }
});

// Route 4: Delete a Note using "api/notes/deletenote/:id" (login required)
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find a note to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "No Note Found" });
    }

    // Allow deletion by the creating user only
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Message: "Note has been deleted", note: note });
  } catch (error) {
    // Handle any server errors that may occur during the process
    console.error(error); // Log the error for debugging
    return res.status(500).send("Internal Server Error"); // Return a 500 (Internal Server Error) response
  }
});

module.exports = router;
