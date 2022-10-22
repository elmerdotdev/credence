import React, { useState, useEffect } from 'react'
import moment from 'moment'

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
        console.log(groupArrays)
    }, [ props.events, props.firstDay, props.lastDay ])

    return (
        <div className="page-calendar-widget">
            <h2>{props.currMonth}</h2>

            {events.length === 0 ? (
                <button>Add Your First Event</button>
            ) : (
                <div className="monthlyEvents">
                    {/* {events.map(event => {
                        return eventListItem(event)
                    })} */}
                    {groupedEvents.map((day, i) => {
                        return dayListItem(day, i)
                    })}
                </div>
            )}
        </div>
    )
}

const dayListItem = (day, i) => {
    return (
        <div className="dateEvents" key={i}>
            <h3>{moment(day.date).format("DD")}</h3>
            {day.events.map((event, i) => (
                <div className="eventRow" key={i}>
                    {moment(event.start_date).format("hh:mm") !== moment(event.end_date).format("hh:mm") ? (
                        <div className="datesStartEnd">
                            <strong>{moment(event.start_date).format("hh:mm A")}</strong>
                            <span>{moment(event.end_date).format("hh:mm A")}</span>
                        </div>
                    ) : (
                        <div className="datesStartEnd">
                            <strong>{moment(event.start_date).format("hh:mm A")}</strong>
                        </div>
                    )}
                    <div>
                        <h4>{event.title}</h4>
                    </div>
                </div>
            ))}
            {/* <div>{event.title}</div>
            <div>Start: {moment(event.start_date).format("hh:mm A")}</div>
            <div>End: {moment(event.end_date).format("hh:mm A")}</div> */}
        </div>
    )
}

export default EventsWidget