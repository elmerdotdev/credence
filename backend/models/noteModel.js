const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    client_id: {
        type: String
    },
    activity_id: {
        type: String
    },
    user_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', noteSchema)