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
router.get('/:userid', getActivities)

// Get single activity
router.get('/:userid/:id', getActivity)

// Post a new activity
router.post('/', createActivity)

// Delete an activity
router.delete('/:id', deleteActivity)

// Update an activity (specific properties)
router.patch('/:id', updateActivity)

module.exports = router