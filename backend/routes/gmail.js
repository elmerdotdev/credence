const express = require('express')

const {
    getGmails,
    getClientGmails,
    getGmail
} = require('../controllers/gmailController')

const router = express.Router()

// Get all Gmails
router.get('/:userid', getGmails)

// Get all gmails of client
router.get('/:userid/:clientid', getClientGmails)

// Get single gmail
router.get('/:userid/:clientid/:id', getGmail)


module.exports = router