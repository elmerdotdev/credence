const express = require('express')

const {
    getUser,
    loginUser,
    googleLogin,
    createUser,
    updateUser,
    gmailAuth
} = require('../controllers/userController')

const router = express.Router()

// Get single user
router.get('/:id', getUser)

// Post login user (login)
router.post('/login', loginUser)

//Post Google login user (login)
router.post('/googlelogin', googleLogin)

router.get('/gmailauth/:id', gmailAuth)

// Post a new userss (Signin)
router.post('/signup', createUser)

// Update a user (specific properties)
router.patch('/:id', updateUser)

module.exports = router