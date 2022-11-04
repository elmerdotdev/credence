import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import moment from 'moment'

Modal.setAppElement('body');

const ViewEvent = (props) => {
    const [event, setEvent] = useState({})
    const [clientName, setClientName] = useState('')

    useEffect(() => {
        const fetchEvent = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${props.userId}/${props.eventId}`)
            const data = await res.json()

            setEvent(data)

            if (data.client_id) {
                const resClient = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${props.userId}/${data.client_id}`)
                const dataClient = await resClient.json()

                setClientName(`${dataClient.firstname || 'None'} ${dataClient.lastname || ''}`)
            }
        }

        fetchEvent()
    }, [ props.userId, props.eventId ])

    return (
        <div>
            <Modal
                isOpen={props.modalOpen}
                onRequestClose={() => props.onToggle(false)}
                className="credence-modal modal-event-view"
                contentLabel="View Event"
            >
                <div className="viewModalButtons">
                    <div>
                        <i className="icon-close" onClick={() => props.onToggle(false)}></i>
                    </div>
                    <div>
                        <button>Edit</button>
                        <button onClick={() => props.onDelete(props.eventId)}>Delete</button>
                    </div>
                </div>
                <h2>{event.title}</h2>
                <table className="viewModalTable">
                    <tbody>
                        <tr>
                            <th>Category</th>
                            <td>{event.type}</td>
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
                            <th>Client</th>
                            <td>{clientName}</td>
                        </tr>
                        <tr>
                            <th colSpan="2">Description</th>
                        </tr>
                        <tr>
                            <td colSpan="2">{event.description}</td>
                        </tr>
                    </tbody>
                </table>
            </Modal>
        </div>
    )
}

export default ViewEvent