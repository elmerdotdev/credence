const express = require('express')

const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')

const router = express.Router()

// Get all users
router.get('/', getUsers)

// Get single users
router.get('/:id', getUser)

// Post a new user
router.post('/', createUser)

// Delete a user
router.delete('/:id', deleteUser)

// Update a user (specific properties)
router.patch('/:id', updateUser)

module.exports = router