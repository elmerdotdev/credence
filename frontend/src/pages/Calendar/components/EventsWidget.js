import React from 'react'

const EventsWidget = (props) => {
  return (
    
    <div className="page-calendar-widget">
        <h2>{props.currMonth}</h2>
        <p>There are {props.events.length} events bro.</p>
        
        {props.events.length === 0 && (
            <button>Add Event</button>
        )}
    </div>

  )
}

export default EventsWidget