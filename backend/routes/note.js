const express = require('express')

const {
    getNotes,
    getClientNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote
} = require('../controllers/noteController')

const router = express.Router()

// Get all notes
router.get('/:userid', getNotes)

// Get all notes of client
router.get('/:userid/:clientid', getClientNotes)

// Get single note
router.get('/:userid/:clientid/:id', getNote)

// Post a new note
router.post('/', createNote)

// Delete a note
router.delete('/:id', deleteNote)

// Update a note (specific properties)
router.patch('/:id', updateNote)

module.exports = router