const fs = require('fs').promises;
const mongoose = require('mongoose')
const {authorize,  listMsgs, CREDENTIALS_PATH} = require('./gmailAuthModule/gmail');
const { gmail } = require('../routes/gmail');
const Gmail = require('../models/gmailModel')


// Get all gmails
const getGmails = async (req, res) => {
    const { userid } = req.params

    const gmails = await Gmail.find({ user_id: userid }).sort({createdAt: -1})

    res.status(200).json(gmails)
}

// Get gmails of one client
const getClientGmails = async (req, res) => {
    const { userid, clientid } = req.params

    const notes = await Gmail.find({ user_id: userid, client_id: clientid }).sort({createdAt: -1})

    if (!notes) {
        return res.status(404).json({ error: 'No gmails' })
    }

    res.status(200).json(notes)
}

// Get a single gmail
const getGmail = async (req, res) => {
    const { userid, clientid, id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such gmail' })
    }

    const gmail = await Note.findOne({ user_id: userid, client_id: clientid, _id:id })

    if (!gmail) {
        return res.status(404).json({ error: 'No such gmail' })
    }

    res.status(200).json(gmail)
}


// Add All Gmails
const addAllGmails = async (req, res) => {
    const { title, content, emailTime, client_id, user_id } = req.body

    try {
        const gmail = await Gmail.create({ title, content, emailTime, client_id, user_id })
        res.status(200).json(gmail)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    getGmails,
    getClientGmails,
    getGmail,
    addAllGmails
}






