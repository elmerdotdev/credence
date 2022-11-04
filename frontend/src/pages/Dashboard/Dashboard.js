import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import "react-datetime/css/react-datetime.css";

import EventsWidget from '../Calendar/components/EventsWidget';
// import ViewEvent from '../Calendar/components/ViewEvent';
import AddEvent from '../Calendar/components/AddEvent';

const Dashboard = () => {
  const currentMonth = moment().format('MMMM YYYY')
  const monthFirstDay = moment().startOf('month').format('YYYY-MM-DD')
  const monthLastDay = moment().endOf('month').format('YYYY-MM-DD')
  const userID = '633b6a81145c9d79405c54ea'

  const navigate = useNavigate()

  const [events, setEvents] = useState([])
  // const [viewEventId, setViewEventId] = useState('')

  // Modal States
  const [modalAddOpen, setModalAddOpen] = useState(false)
  // const [modalViewOpen, setModalViewOpen] = useState(false)

  useEffect(() => {
    const getActivities = async () => {
      const activities = await fetchActivities()

      setEvents(activities)
    }

    getActivities()
  }, [])

  // Get clients
  const fetchClients = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}`)
    const data = await res.json()

    return data
  }

  // Get client
  const fetchClient = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}/${id}`)
    const data = await res.json()

    return data
  }

  // Get all activities/events
  const fetchActivities = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${userID}`)
    const data = await res.json()

    return data
  }

  // Delete activity/event
  // const deleteEvent = async (id) => {
  //   await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
  //     method: 'DELETE'
  //   })

  //   setEvents(events.filter(event => event._id !== id))
  //   toggleViewModal(false)
  // }

  // Toggle Add modal
  const toggleAddModal = (status) => {
    setModalAddOpen(status)
  }

  // Toggle View modal
  // const toggleViewModal = (status) => {
  //   setModalViewOpen(status)
  // }

  // On Event Click
  const handleEventClick = (element) => {
    navigate('/calendar')
  }

  // Add New Event to events state
  const addToEventsState = (event) => {
    setEvents(current => [...current, event])
  }

  return (
    <section className="page-dashboard">
      <ul className="dashboard-tabs">
        <li>
          <button>Connection</button>
        </li>
        <li>
          <button>Upcoming</button>
        </li>
      </ul>

      <div className="dashboard-wrapper">
        <div className="dashboard-connection">

        </div>

        <div className="dashboard-upcoming">
          <EventsWidget events={events} currMonth={currentMonth} firstDay={monthFirstDay} lastDay={monthLastDay} onEventClick={handleEventClick} fetchClient={fetchClient} />

          {modalAddOpen &&
            <AddEvent modalOpen={modalAddOpen} onToggle={toggleAddModal} onAddState={addToEventsState} fetchClients={fetchClients} userId={userID} />
          }

          {/* {modalViewOpen &&
            <ViewEvent modalOpen={modalViewOpen} onToggle={toggleViewModal} onDelete={deleteEvent} userId={userID} eventId={viewEventId} fetchClient={fetchClient} />
          } */}
        </div>
      </div>
    </section>
  )
}

export default Dashboard