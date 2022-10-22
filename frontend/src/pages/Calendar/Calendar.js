import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'
import "react-datetime/css/react-datetime.css";

// Components
import EventsWidget from './components/EventsWidget'
import AddEvent from './components/AddEvent'

const Calendar = () => {
  const [events, setEvents] = useState([])
  const [currentMonth, setCurrentMonth] = useState('')
  const [monthFirstDay, setMonthFirstDay] = useState()
  const [monthLastDay, setMonthLastDay] = useState()
  const [addDate, setAddDate] = useState()

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
    const res = await fetch(`http://localhost:5000/api/activities/${userID}`)
    const data = await res.json()

    return data
  }
  
  // On Date Cell Click
  const handleDateClick = (element) => {
    console.log(element)
    setModalAddOpen(true)
    setAddDate(element.date)
  }

  // On Event Click
  const handleEventClick = (element) => {
    console.log(element)
    console.log(element.event._def.title)
  }

  // Run when Calendar View loads or changes
  const handleCalendarLoad = (arg) => {
    setCurrentMonth(moment(arg.start).format("MMMM YYYY"))
    setMonthFirstDay(moment(arg.start).format("YYYY-MM-DD"))
    setMonthLastDay(moment(arg.end).subtract(1, "days").format("YYYY-MM-DD"))
  }

  // Toggle Add modal
  const toggleAddModal = (status) => {
    setModalAddOpen(status)
  }

  // Calendar update test
  const updateCalendar = () => {
    const newEvent = { id: 123, title: "Elmer Test 1", start: new Date("2022-10-02").toISOString(), end: new Date("2022-10-07").toISOString()}
    
    let calendarApi = calendarRef.current.getApi()
    calendarApi.addEvent(newEvent)
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

      <EventsWidget events={events} currMonth={currentMonth} firstDay={monthFirstDay} lastDay={monthLastDay} />

      <AddEvent modalOpen={modalAddOpen} onToggle={toggleAddModal} onDateClick={addDate} userId={userID} />

    </section>
  )
}

export default Calendar