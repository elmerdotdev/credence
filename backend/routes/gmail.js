const express = require('express')

const {
    getGmails,
    getClientGmails,
    getGmail,
    addGmails
} = require('../controllers/gmailController')

const router = express.Router()

// Get all Gmails
router.get('/:userid/get', getGmails)

// Add all Gmails
router.get('/:userid', addGmails)

// Get all gmails of client
router.get('/:userid/:clientid', getClientGmails)

// Get single gmail
router.get('/:userid/:clientid/:id', getGmail)


module.exports = router