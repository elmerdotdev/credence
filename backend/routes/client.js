const express = require('express')

const {
    getClients,
    getClient,
    createClient,
    deleteClient,
    updateClient
} = require('../controllers/clientController')

const router = express.Router()

// Get all clients
router.get('/:userid', getClients)

// Get single client
router.get('/:userid/:id', getClient)

// Post a new client
router.post('/', createClient)

// Delete a client
router.delete('/:id', deleteClient)

// Update a client (specific properties)
router.patch('/:id', updateClient)

module.exports = router