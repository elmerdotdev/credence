const express = require('express')

const {
    getUser,
    createUser,
    updateUser
} = require('../controllers/userController')

const router = express.Router()

// Get single user
router.get('/:id', getUser)

// Post a new user
router.post('/', createUser)

// Update a user (specific properties)
router.patch('/:id', updateUser)

module.exports = router