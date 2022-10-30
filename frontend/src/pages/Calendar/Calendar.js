import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'
import "react-datetime/css/react-datetime.css";

// Components
import EventsWidget from './components/EventsWidget'
import AddEvent from './components/AddEvent'
import ViewEvent from './components/ViewEvent'

const Calendar = () => {
  const [events, setEvents] = useState([])
  const [currentMonth, setCurrentMonth] = useState('')
  const [monthFirstDay, setMonthFirstDay] = useState()
  const [monthLastDay, setMonthLastDay] = useState()
  const [addDate, setAddDate] = useState()
  const [viewEventId, setViewEventId] = useState('')

  // Modal states
  const [modalAddOpen, setModalAddOpen] = useState(false)
  const [modalEditOpen, setModalEditOpen] = useState(false)
  const [modalViewOpen, setModalViewOpen] = useState(false)

  const calendarRef = React.useRef()

  const userID = '633b6a81145c9d79405c54ea'

  useEffect(() => {
    const getActivities = async () => {
      const activities = await fetchActivities()

      setEvents(activities)
    }

    getActivities()
  }, [])

  // Get all activities/events
  const fetchActivities = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${userID}`)
    const data = await res.json()

    return data
  }

  // Delete activity/event
  const deleteEvent = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
      method: 'DELETE'
    })

    setEvents(events.filter(event => event._id !== id))
    toggleViewModal(false)
  }

  // Get client
  const fetchClient = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}/${id}`)
    const data = await res.json()

    return data
  }

  // Toggle Add modal
  const toggleAddModal = (status) => {
    setModalAddOpen(status)
  }

  // Toggle View modal
  const toggleViewModal = (status) => {
    setModalViewOpen(status)
  }
  
  // On Date Cell Click
  const handleDateClick = (element) => {
    toggleAddModal(true)
    setAddDate(element.date)
  }

  // On Event Click
  const handleEventClick = (element) => {
    toggleViewModal(true)
    setViewEventId(element.event._def.publicId)
  }

  // Run when Calendar View loads or changes
  const handleCalendarLoad = (arg) => {
    setCurrentMonth(moment(arg.start).format("MMMM YYYY"))
    setMonthFirstDay(moment(arg.start).format("YYYY-MM-DD"))
    setMonthLastDay(moment(arg.end).subtract(1, "days").format("YYYY-MM-DD"))
  }

  // Add New Event to events state
  const addToEventsState = (event) => {
    setEvents(current => [...current, event])
  }

  return (
    <section className="page-calendar">

      <div className="page-calendar-view">
        <button onClick={() => toggleAddModal(true)}>Add Event</button>

      <FullCalendar
        ref={calendarRef}
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={
          events.map(event => {
            return {
              id: event._id,
              title: event.title,
              start: event.start_date,
              end: event.end_date
            }
          })
        }
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        datesSet={handleCalendarLoad}
        showNonCurrentDates={false}
      />
      </div>

      <EventsWidget events={events} currMonth={currentMonth} firstDay={monthFirstDay} lastDay={monthLastDay} onEventClick={handleEventClick} fetchClient={fetchClient} />

      <AddEvent modalOpen={modalAddOpen} onToggle={toggleAddModal} onDateClick={addDate} onAddState={addToEventsState} userId={userID} />

      <ViewEvent modalOpen={modalViewOpen} onToggle={toggleViewModal} onDelete={deleteEvent} userId={userID} eventId={viewEventId} fetchClient={fetchClient} />

    </section>
  )
}

export default Calendar