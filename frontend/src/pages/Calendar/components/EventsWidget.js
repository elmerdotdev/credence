import React, { useState, useEffect } from 'react'
import moment from 'moment'

const EventsWidget = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        // Filter events to only show current month
        const monthEvents = props.events.filter(d => {
            return (props.firstDay < d.start_date && d.start_date < props.lastDay)
        })

        setEvents(monthEvents)
    }, [ props.events, props.firstDay, props.lastDay ])

    return (
        <div className="page-calendar-widget">
            <h2>{props.currMonth}</h2>

            {events.length === 0 ? (
                <button>Add Your First Event</button>
            ) : (
                <ul>
                    {events.map(event => {
                        return eventListItem(event)
                    })}
                </ul>
            )}
        </div>
    )
}

const eventListItem = (event) => {
    return (
        <li key={event._id}>
            <div>{event.title}</div>
            <div>Start: {moment(event.start_date).format("hh:mm A")}</div>
            <div>End: {moment(event.end_date).format("hh:mm A")}</div>
        </li>
    )
}

export default EventsWidget