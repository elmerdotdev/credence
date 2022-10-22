import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import moment from 'moment'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('body');

const ViewEvent = (props) => {
    const [event, setEvent] = useState({})

    useEffect(() => {
        const fetchEvent = async () => {
            const res = await fetch(`http://localhost:5000/api/activities/${props.userId}/${props.eventId}`)
            const data = await res.json()

            setEvent(data)
        }

        fetchEvent()
    }, [ props.userId, props.eventId ])

    return (
        <div>
            <Modal
                isOpen={props.modalOpen}
                onRequestClose={() => props.onToggle(false)}
                style={customStyles}
                contentLabel="View Event"
            >
                <button onClick={() => props.onToggle(false)}>Close</button>
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
                            <td>{event.client}</td>
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