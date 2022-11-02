import React, { useState, useEffect } from 'react'
import moment from 'moment'
import EventsWidgetRow from './EventsWidgetRow'

const EventsWidget = (props) => {
    const [ events, setEvents ] = useState([])
    const [ groupedEvents, setGroupedEvents ] = useState([])

    useEffect(() => {
        // Filter events to only show current month
        const monthEvents = props.events.filter(d => {
            return (props.firstDay < d.start_date && d.start_date < props.lastDay)
        }).sort((a, b) => a.start_date.localeCompare(b.start_date))

        setEvents(monthEvents)

        // Group by day
        const groups = monthEvents.reduce((groups, day) => {
            const date = moment(day.start_date).format("YYYY-MM-DD")
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(day);
            return groups;
        }, {});
        
        const groupArrays = Object.keys(groups).map((date) => {
            return {
                date,
                events: groups[date]
            };
        });

        setGroupedEvents(groupArrays)
    }, [ props.events, props.firstDay, props.lastDay])

    return (
        <div className="page-calendar-widget">
            <h2>{props.currMonth}</h2>

            {events.length === 0 ? (
                <button onClick={() => props.openAddModal(true)}>Add Your First Event</button>
            ) : (
                <div className="monthlyEvents">
                    {groupedEvents.map((day, i) => (
                        <div className="dateEvents" key={i}>
                        <h3>{moment(day.date).format("DD")}</h3>
                        {day.events.map((event, i) => (
                            <EventsWidgetRow event={event} key={i} onEventClick={props.onEventClick} fetchClient={props.fetchClient} />
                        ))}
                    </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EventsWidget