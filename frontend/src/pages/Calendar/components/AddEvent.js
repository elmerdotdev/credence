import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Datetime from 'react-datetime';

Modal.setAppElement('body');

const AddEvent = (props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [type, setType] = useState('')
    const [clients, setClients] = useState([])
    const [clientId, setClientId] = useState('')

    // Destructure
    const fetchClients = props.fetchClients

    const alertMsgs = {
        invalid: "Enter a valid start/end date",
        pastDate: "Start date must not be in the past",
        futureDate: "End date must be after start date"
    }
    
    useEffect(() => {
        const getClients = async () => {
            const data = await fetchClients()

            setClients(data)
        }

        getClients()
        setStart(props.onDateClick)
    }, [ 
        props.userId,
        props.modalOpen,
        props.onDateClick,
        fetchClients ])

    const submitForm = (e) => {
        e.preventDefault()

        if (!start || !end) {
            alert(alertMsgs.invalid)
            return false
        }

        if (start < new Date()) {
            alert(alertMsgs.pastDate)
            return false
        }

        if (end < start) {
            alert(alertMsgs.futureDate)
            return false
        }

        const eventToAdd = {
            title: title,
            description: description || '',
            start_date: start,
            end_date: end,
            type: type,
            client_id: clientId || '',
            user_id: props.userId
        }

        addEventToDB(eventToAdd)
    }

    const addEventToDB = async (event) => {
        console.log(event)
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(event)
        })

        const data = await res.json()

        props.onAddState(data)
        props.onToggle(false)
    }

    return (
        <div>
            <Modal
                isOpen={props.modalOpen}
                onRequestClose={() => props.onToggle(false)}
                className="credence-modal"
                contentLabel="Add Event"
            >
                <button onClick={() => props.onToggle(false)}>Close</button>
                <h2>Add Event</h2>
                <form className="addEventForm" onSubmit={submitForm}>
                    <div className="column">
                        <div className="input-wrapper">
                            <label htmlFor="title">Event name</label>
                            <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" cols="30" rows="15" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                    </div>
                    <div className="column">
                        <div className="input-wrapper">
                            <label htmlFor="startdate">Start</label>
                            <Datetime initialValue={props.onDateClick || start} onChange={date => setStart(date)} />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="enddate">End</label>
                            <Datetime value={end} onChange={date => setEnd(date)} />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="eventtype">Event Type</label>
                            <select id="eventtype" required defaultValue={type || ''} onChange={e => setType(e.target.value) || ''}>
                                <option value=""></option>
                                <option value="meeting">Meeting</option>
                                <option value="birthday">Birthday</option>
                            </select>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="clientlist">Client</label>
                            <select id="clientlist" value={clientId || ''} onChange={e => setClientId(e.target.value) || ''}>
                                <option value=""></option>
                                {clients.map((client, i) => (
                                    <option key={i} value={client._id}>{client.firstname} {client.lastname}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="input-wrapper submit-btn-wrapper">
                        <input type="submit" value="Add New Event" />
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddEvent