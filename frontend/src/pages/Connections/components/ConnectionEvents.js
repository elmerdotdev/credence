import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const ConnectionEvents = ({ connectionID, userID }) => {
    const [events, setEvents] = useState([])
    const [clientEvents, setClientEvents] = useState([])
    const colorArray = [
        '#F8C5A1', '#D6F99E', '#F9ADAD', '#B4D1FD', '#B8B5FF'
    ]

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${userID}`)
            const res = await data.json()
            
            setEvents(res)
        }

        fetchEvents()
    }, [connectionID, userID])

    useEffect(() => {
        let eventsArr = []

        events.forEach(event => {
            event.client_id.forEach(client => {
                if (client.value === connectionID) {
                    eventsArr.push(event)
                }
            })
        })

        setClientEvents(eventsArr)
    }, [events, connectionID])

    return (
        <div className="connection-events-list">
            <h3>Events</h3>
            {clientEvents.map(event => {
                return (
                    <table>
                        <thead>
                            <tr>
                                <th colspan="2">{event.title}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="event-tbl-label">Category</td>
                                <td className="event-tbl-type">{event.title}</td>
                            </tr>
                            <tr>
                                <td className="event-tbl-label">Date</td>
                                <td className="event-tbl-date">
                                    {moment(event.start_date).format("DD") !== moment(event.end_date).format("DD") ? (
                                        <div className="viewEventDates">
                                            <span>{moment(event.start_date).format("DD MMM YYYY, hh:mm a")}</span>
                                            <span>{moment(event.end_date).format("DD MMM YYYY, hh:mm a")}</span>
                                        </div>
                                    ) : (
                                        <span>{moment(event.start_date).format("DD MMM YYYY, hh:mm a")} - {moment(event.end_date).format("hh:mm a")}</span>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="event-tbl-label">Connection</td>
                                <td className="event-tbl-connection">
                                {event.client_id.map((client, i) => (
                                    <Link key={i} to={`/connections/?connectionId=${client.value}`} style={{ backgroundColor: colorArray[i] }}>{client.label}</Link>
                                ))}
                                </td>
                            </tr>
                            {event.description &&
                            <tr>
                                <td colSpan="2" className="event-tbl-label">Description</td>
                            </tr>
                            }
                            {event.description &&
                            <tr>
                                <td colSpan="2">
                                    <p>{event.description}</p>
                                </td>
                            </tr>
                            }
                        </tbody>
                    </table>
                )
            })}
        </div>
    )
}

export default ConnectionEvents