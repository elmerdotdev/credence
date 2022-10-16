const User = require('../models/userModel')
const mongoose = require('mongoose')

// Get a single user
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    res.status(200).json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        photo: user.photo,
        lastLoggedIn: user.lastLoggedIn
    })
}

// Create new user
const createUser = async (req, res) => {
    const { firstname, lastname, email, password, photo, lastLoggedIn } = req.body

    try {
        const user = await User.create({ firstname, lastname, email, password, photo, lastLoggedIn })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Update a user
const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        return res.status(400).json({ error: 'No such user' })
    }

    res.status(200).json(user)
}

module.exports = {
    // getUsers,
    getUser,
    createUser,
    // deleteUser,
    updateUser
}