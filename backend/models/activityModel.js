const mongoose = require('mongoose')

const Schema = mongoose.Schema

const activitySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    client_id: {
        type: Array
    },
    user_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Activity', activitySchema)