const Activity = require('../models/activityModel')
const mongoose = require('mongoose')

// Get all activities
const getActivities = async (req, res) => {
    const { userid } = req.params

    const activities = await Activity.find({ user_id: userid }).sort({createdAt: -1})

    res.status(200).json(activities)
}

// Get a single activity
const getActivity = async (req, res) => {
    const { userid } = req.params
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such activity' })
    }

    const activity = await Activity.findOne({ user_id: userid, _id: id })

    if (!activity) {
        return res.status(404).json({ error: 'No such activity' })
    }

    res.status(200).json(activity)
}

// Create new activity
const createActivity = async (req, res) => {
    const { title, description, start_date, end_date, type, client_id, user_id } = req.body

    try {
        const activity = await Activity.create({ title, description, start_date, end_date, type, client_id, user_id })
        res.status(200).json(activity)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a activity
const deleteActivity = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such activity' })
    }

    const activity = await Activity.findOneAndDelete({_id: id})

    if (!activity) {
        return res.status(400).json({ error: 'No such activity' })
    }

    res.status(200).json(activity)
}

// Update a activity
const updateActivity = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such activity' })
    }

    const activity = await Activity.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!activity) {
        return res.status(400).json({ error: 'No such activity' })
    }

    res.status(200).json(activity)
}

module.exports = {
    getActivities,
    getActivity,
    createActivity,
    deleteActivity,
    updateActivity
}