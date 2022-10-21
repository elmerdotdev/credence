import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Modal from 'react-modal'
import moment from 'moment'

// Components
import EventsWidget from './components/EventsWidget'

const Calendar = () => {
  const [events, setEvents] = useState([])
  const [currentMonth, setCurrentMonth] = useState('')
  const [monthFirstDay, setMonthFirstDay] = useState()
  const [monthLastDay, setMonthLastDay] = useState()

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

  // Calendar update test
  const updateCalendar = () => {
    const novemberEvents = [
      {id: 123, title: "Elmer Test 1", start: new Date("2022-10-02").toISOString(), end: new Date("2022-10-07").toISOString()},
      {id: 456, title: "Elmer Test 2", start: new Date("2022-10-22").toISOString(), end: new Date("2022-10-23").toISOString()}
    ]

    console.log(novemberEvents)

    setEvents(novemberEvents)
  }

  return (
    <section className="page-calendar">

      <div className="page-calendar-view">
        <button onClick={() => updateCalendar()}>Add Events</button>

      <FullCalendar
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

    </section>
  )
}

export default Calendar