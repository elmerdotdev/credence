const fs = require('fs').promises;
const mongoose = require('mongoose')
const {authorize,  listMsgs, CREDENTIALS_PATH} = require('./gmailAuthModule/gmail');
const { gmail } = require('../routes/gmail');
const Gmail = require('../models/gmailModel')
const Client = require('../models/clientModel')


// Get all gmails
const getGmails = async (req, res) => {
    const { userid } = req.params

    const gmails = await Gmail.find({ user_id: userid }).sort({createdAt: -1})

    res.status(200).json(gmails)
}

// Get gmails of one client
const getClientGmails = async (req, res) => {
    console.log(req.params)
    const { clientid, userid } = req.params

    const gmails = await Gmail.find({user_id: userid, client_id: clientid}).sort({createdAt: -1})
    console.log(gmails)
    if (!gmails) {
        return res.status(404).json({ error: 'No gmails' })
    }

    res.status(200).json(gmails)
}

// Get a single gmail
const getGmail = async (req, res) => {
    const { userid, clientid, id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such gmail' })
    }

    const gmail = await Gmail.findOne({ user_id: userid, client_id: clientid, _id:id })

    if (!gmail) {
        return res.status(404).json({ error: 'No such gmail' })
    }

    res.status(200).json(gmail)
}


// Add All Gmails
const addAllGmails = async (req, res) => {
    const { subject, snippet, from, to, emailTime, client_id, user_id } = req.body

    try {
        const gmail = await Gmail.create({ subject, snippet, from, to, emailTime, client_id, user_id })
        res.status(200).json(gmail)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Create new gmail
const addGmails = async (req, res) => {

    const {userid} = req.params
    // const { subject, snippet, from, to, client_id, activity_id, user_id } = req.body
    console.log("gmail updated")
    const client = await authorize(userid).catch(console.error);
    const retrievedMsgs = await listMsgs(client)
    const connections = await Client.find({user_id: userid}).exec()
    
    try {
        let gmail
        for (let i = 0; i < retrievedMsgs.length; i++) {
            const checkEmail = await Gmail.findOne({ user_id: userid, gmail_id: retrievedMsgs[i].gmail_id })
            console.log(checkEmail)
            if (checkEmail) { continue }

            retrievedMsgs[i].user_id = userid
            connections.forEach((connection) => {
                if (retrievedMsgs[i].to.includes(connection.email) || retrievedMsgs[i].from.includes(connection.email)) {
                    retrievedMsgs[i].client_id = connection._id
                }
            })
            console.log('creating gmails objects')
            gmail = await Gmail.create(retrievedMsgs[i])

        }
        res.status(200).json(gmail)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    getGmails,
    getClientGmails,
    getGmail,
    addAllGmails,
    addGmails
}






