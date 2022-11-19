import React, { useState, useEffect } from 'react'
import moment from 'moment'
import EventsWidgetRow from './EventsWidgetRow'

import ImageCalendarWoman from '../../../images/Calendar/calendar-add-event-woman.svg'

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
            <h2>
                <span>{moment(props.currMonth).format("MMMM")}</span> <span>{moment(props.currMonth).format("YYYY")}</span>
            </h2>

            {events.length === 0 ? (
                <div className="noMonthlyEvents">
                    <img onClick={() => props.openAddModal(true)} src={ImageCalendarWoman} alt="Add First Event" />
                </div>
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