const express = require('express')

const {
    getUser,
    loginUser,
    googleLogin,
    createUser,
    updateUser
} = require('../controllers/userController')

const router = express.Router()

// Get single user
router.get('/:id', getUser)

// Post login user (login)
router.post('/login', loginUser)

//Post Google login user (login)
router.post('/googlelogin', googleLogin)

// Post a new userss (Signin)
router.post('/register', createUser)

// Update a user (specific properties)
router.patch('/:id', updateUser)

module.exports = router