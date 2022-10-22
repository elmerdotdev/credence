const Note = require('../models/noteModel')
const mongoose = require('mongoose')

// Get all notes
const getNotes = async (req, res) => {
    const { userid } = req.params

    const notes = await Note.find({ user_id: userid }).sort({createdAt: -1})

    res.status(200).json(notes)
}

// Get notes of client
const getClientNotes = async (req, res) => {
    const { userid, clientid } = req.params

    const notes = await Note.find({ user_id: userid, client_id: clientid }).sort({createdAt: -1})

    if (!notes) {
        return res.status(404).json({ error: 'No notes' })
    }

    res.status(200).json(notes)
}

// Get a single note
const getNote = async (req, res) => {
    const { userid, clientid, id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such note' })
    }

    const note = await Note.findOne({ user_id: userid, client_id: clientid, _id:id })

    if (!note) {
        return res.status(404).json({ error: 'No such note' })
    }

    res.status(200).json(note)
}

// Create new note
const createNote = async (req, res) => {
    const { title, content, client_id, activity_id, user_id } = req.body

    try {
        const note = await Note.create({ title, content, client_id, activity_id, user_id })
        res.status(200).json(note)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a note
const deleteNote = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such note' })
    }

    const note = await Note.findOneAndDelete({_id: id})

    if (!note) {
        return res.status(400).json({ error: 'No such note' })
    }

    res.status(200).json(note)
}

// Update a note
const updateNote = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such note' })
    }

    const note = await Note.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!note) {
        return res.status(400).json({ error: 'No such note' })
    }

    res.status(200).json(note)
}

module.exports = {
    getNotes,
    getClientNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote
}