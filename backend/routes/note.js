const express = require('express')

const {
    getNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote
} = require('../controllers/noteController')

const router = express.Router()

// Get all notes
router.get('/:id', getNotes)

// Get single note
router.get('/:id/:client_id', getNote)

// Post a new note
router.post('/', createNote)

// Delete a note
router.delete('/:id', deleteNote)

// Update a note (specific properties)
router.patch('/:id', updateNote)

module.exports = router