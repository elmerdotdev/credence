import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'
import "react-datetime/css/react-datetime.css";
import { useNavigate, useSearchParams, Link, useLocation } from 'react-router-dom';


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
  const [currParams, setCurrParams] = useState('');

  // console.log("searchParams: ", searchParams[0])

  // Modal states
  const [modalAddOpen, setModalAddOpen] = useState(false)
  const [modalEditOpen, setModalEditOpen] = useState(false)
  const [modalViewOpen, setModalViewOpen] = useState(false)

  const calendarRef = React.useRef()

  const userID = JSON.parse(localStorage.getItem('user'))._id
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const getActivities = async () => {
      const activities = await fetchActivities()

      setEvents(activities)
    }

    getActivities()

    let params = (new URL(document.location)).searchParams;
    if (params.toString().length > 0) {
      setModalViewOpen(true)
      setViewEventId(params.get("eventId"))
      setCurrParams(params.toString())
    }
  }, [location])

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

  // Toggle Add modal
  const toggleAddModal = (status) => {
    setModalAddOpen(status)
  }

  // Toggle View modal
  const toggleViewModal = (status) => {
    setModalViewOpen(status)
    navigate(`/calendar`)
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
        <FullCalendar
          ref={calendarRef}
          displayEventTime={false}
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
          fixedWeekCount={false}
          height="100%"
          headerToolbar={{
            start: 'prev,title,next',
            center: '',
            end: 'today'
          }}
        />
      </div>

      <EventsWidget events={events} currMonth={currentMonth} firstDay={monthFirstDay} lastDay={monthLastDay} onEventClick={handleEventClick} fetchClient={fetchClient} openAddModal={toggleAddModal} />

      {modalAddOpen &&
        <AddEvent modalOpen={modalAddOpen} onToggle={toggleAddModal} onDateClick={addDate} onAddState={addToEventsState} fetchClients={fetchClients} userId={userID} />
      }

      {modalViewOpen &&
        <ViewEvent modalOpen={modalViewOpen} onToggle={toggleViewModal} onDelete={deleteEvent} userId={userID} eventId={viewEventId} fetchClient={fetchClient} />
      }

    </section>
  )
}

export default Calendar