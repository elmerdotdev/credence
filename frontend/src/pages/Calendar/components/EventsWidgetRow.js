import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'

const EventsWidgetRow = (props) => {
    const navigate = useNavigate()

    const colorArray = [
        '#F8C5A1', '#D6F99E', '#F9ADAD', '#B4D1FD', '#B8B5FF'
    ]

    return (
        <div className="eventRow">
            {moment(props.event.start_date).format("hh:mm") !== moment(props.event.end_date).format("hh:mm") ? (
                <div className="datesStartEnd" onClick={() => navigate(`/calendar/?eventId=${props.event._id}`)}>
                    <strong>{moment(props.event.start_date).format("hh:mm A")}</strong>
                    <span>{moment(props.event.end_date).format("hh:mm A")}</span>
                </div>
            ) : (
                <div className="datesStartEnd" onClick={() => navigate(`/calendar/?eventId=${props.event._id}`)}>
                    <strong>{moment(props.event.start_date).format("hh:mm A")}</strong>
                </div>
            )}

            <div className="eventRow-details">
                <h4 onClick={() => navigate(`/calendar/?eventId=${props.event._id}`)}>{props.event.title}</h4>
            </div>

            <div className="eventRow-connections">
                {props.event.client_id[0] && props.event.client_id.map((client, i) => (
                    <Link key={i} to={`/connections/?connectionId=${client.value}`} className="event-client" style={{ backgroundColor: colorArray[i] }}>{client.label}</Link>
                ))}
            </div>
        </div>
    )
}

export default EventsWidgetRow