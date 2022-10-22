const express = require('express')

const {
    getUser,
    loginUser,
    createUser,
    updateUser
} = require('../controllers/userController')

const router = express.Router()

// Get single user
router.get('/:id', getUser)

// Post login user
router.post('/login', loginUser)

// Post a new userss
router.post('/register', createUser)

// Update a user (specific properties)
router.patch('/:id', updateUser)

module.exports = router