import React from 'react'

const EventsWidget = (props) => {
  return (
    
    <div className="page-calendar-widget">
        <h2>{props.currMonth}</h2>
        <p>There are {props.events.length} events bro.</p>
    </div>

  )
}

export default EventsWidget