const mongoose = require('mongoose')
 
const Schema = mongoose.Schema

const gmailSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    emailTime: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    client_id: {
        type: String
    },
    gmail_id: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Gmail', gmailSchema)












