const express = require('express')

const {
    getActivities,
    getActivity,
    createActivity,
    deleteActivity,
    updateActivity
} = require('../controllers/activityController')

const router = express.Router()

// Get all activities
router.get('/', getActivities)

// Get single activity
router.get('/:id', getActivity)

// Post a new activity
router.post('/', createActivity)

// Delete a activity
router.delete('/:id', deleteActivity)

// Update an activity (specific properties)
router.patch('/:id', updateActivity)

module.exports = router