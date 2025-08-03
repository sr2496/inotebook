const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes'); // Assuming you have a Notes model defined
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.get('/', fetchuser, async (req, res) => {
    const userId = req.user.id;
    const notes = await Notes.find({ user: userId });
    res.json(notes);
})

router.post('/create', fetchuser, [
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long.s'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long.'),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { title, description, tag } = req.body;

    try {
        const note = await Notes.create({
            user: userId,
            title,
            description,
            tag
        });

        return res.status(201).json(note);

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }

})

router.put('/update/:id', fetchuser, [
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long.s'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long.'),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newNote = {};
        const userId = req.user.id;
        const { title, description, tag } = req.body;
        const noteId = req.params.id;
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        const note = await Notes.findById(noteId);
        if (!note) {
            return res.status(404).json({ error: 'Note not found.' });
        }

        if (userId.toString() !== note.user.toString()) {
            return res.status(401).json({ error: 'Unauthorized access.' });
        }
        const updatedNote = await Notes.findByIdAndUpdate(noteId, { $set: newNote }, { new: true });

        res.json(updatedNote);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }

})

router.delete('/delete/:id', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const noteId = req.params.id;

        const note = await Notes.findById(noteId);
        if (!note) {
            return res.status(404).json({ error: 'Note not found.' });
        }

        if (userId.toString() !== note.user.toString()) {
            return res.status(401).json({ error: 'Unauthorized access.' });
        }

        await Notes.findByIdAndDelete(noteId);

        return res.status(200).json({ message: 'Note deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
})
module.exports = router;