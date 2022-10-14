const Client = require('../models/clientModel')
const mongoose = require('mongoose')

// Get all clients
const getClients = async (req, res) => {
    const { userid } = req.params

    const clients = await Client.find({ user_id: userid }).sort({createdAt: -1})

    res.status(200).json(clients)
}

// Get a single client
const getClient = async (req, res) => {
    const { userid, id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such client' })
    }

    const client = await Client.findOne({ user_id: userid, _id: id })

    if (!client) {
        return res.status(404).json({ error: 'No such client' })
    }

    res.status(200).json(client)
}

// Create new client
const createClient = async (req, res) => {
    const { firstname, lastname, position, company, email, phone, description, active, pinned, labels, photo, user_id } = req.body

    try {
        const client = await Client.create({ firstname, lastname, position, company, email, phone, description, active, pinned, labels, photo, user_id })
        res.status(200).json(client)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a client
const deleteClient = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such client' })
    }

    const client = await Client.findOneAndDelete({_id: id})

    if (!client) {
        return res.status(400).json({ error: 'No such client' })
    }

    res.status(200).json(client)
}

// Update a client
const updateClient = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such client' })
    }

    const client = await Client.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!client) {
        return res.status(400).json({ error: 'No such client' })
    }

    res.status(200).json(client)
}

module.exports = {
    getClients,
    getClient,
    createClient,
    deleteClient,
    updateClient
}