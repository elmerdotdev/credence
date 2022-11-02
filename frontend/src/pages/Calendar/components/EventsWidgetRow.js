import React, { useState, useEffect } from 'react'
import moment from 'moment'

const EventsWidgetRow = (props) => {
    const [client, setClient] = useState({})

    // Destructure
    const clientId = props.event.client_id
    const fetchClient = props.fetchClient

    useEffect(() => {
        const getClient = async () => {
            const data = await fetchClient(clientId)

            setClient(data)
        }

        getClient()
    }, [ fetchClient, clientId ])

    return (
        <div className="eventRow" onClick={() => props.onEventClick({event: {_def: {publicId: props.event._id}}})}>

            {moment(props.event.start_date).format("hh:mm") !== moment(props.event.end_date).format("hh:mm") ? (
                <div className="datesStartEnd">
                    <strong>{moment(props.event.start_date).format("hh:mm A")}</strong>
                    <span>{moment(props.event.end_date).format("hh:mm A")}</span>
                </div>
            ) : (
                <div className="datesStartEnd">
                    <strong>{moment(props.event.start_date).format("hh:mm A")}</strong>
                </div>
            )}

            <div>
                <h4>{props.event.title}</h4>
                <span className="event-client">{client.firstname} {client.lastname}</span>
            </div>
        </div>
    )
}

export default EventsWidgetRow