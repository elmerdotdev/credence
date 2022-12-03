import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import moment from 'moment'

Modal.setAppElement('body');

const ViewEvent = (props) => {
    const [event, setEvent] = useState({})
    const colorArray = [
        '#F8C5A1', '#D6F99E', '#F9ADAD', '#B4D1FD', '#B8B5FF'
    ]

    useEffect(() => {
        const fetchEvent = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${props.userId}/${props.eventId}`)
            const data = await res.json()

            setEvent(data)
        }

        fetchEvent()
    }, [ props.modalOpen, props.userId, props.eventId ])

    return (
        <div>
            <Modal
                isOpen={props.modalOpen}
                onRequestClose={() => props.onToggle(false)}
                className="credence-modal modal-event-view"
                contentLabel="View Event"
                closeTimeoutMS={500}
            >
                <div className="viewModalButtons">
                    <div>
                        <i className="icon-close" onClick={() => props.onToggle(false)}></i>
                    </div>
                    <div>
                        <button className="btn btn-primary-reverse" onClick={() => props.onToggleEdit(event)}>Edit <i className="icon-edit"></i></button>
                        <button className="btn btn-primary-reverse" onClick={() => props.onDelete(props.eventId)}>Delete <i className="icon-trash"></i></button>
                    </div>
                </div>

                <div className="viewModalContent">
                    <h2>{event.title}</h2>
                    <table className="viewModalTable">
                        <tbody>
                            <tr>
                                <th>Category</th>
                                <td className="viewEventType">{event.type}</td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td>
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
                                <th>Connection</th>
                                <td className="viewModalConnections">
                                {event.client_id && event.client_id.map((client, i) => (
                                    <Link key={i} to={`/connections/?connectionId=${client.value}`} style={{ backgroundColor: colorArray[i] }}>{client.label}</Link>
                                ))}
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="2">Description</th>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <p>{event.description}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Modal>
        </div>
    )
}

export default ViewEvent