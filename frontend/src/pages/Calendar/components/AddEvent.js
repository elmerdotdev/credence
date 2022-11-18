import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Datetime from 'react-datetime';
import moment from 'moment';
import Select from 'react-select'

Modal.setAppElement('body');

const AddEvent = (props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [start, setStart] = useState('')
    const [startDate, setStartDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [end, setEnd] = useState('')
    const [endDate, setEndDate] = useState('')
    const [endTime, setEndTime] = useState('')
    const [type, setType] = useState('')
    const [clients, setClients] = useState([])
    const [clientId, setClientId] = useState('')

    // Destructure
    const fetchClients = props.fetchClients

    const alertMsgs = {
        invalid: "Enter a valid start/end date",
        pastDate: "Start date must not be in the past",
        futureDate: "End date must be after start date",
        needClient: "Specify at least one connection"
    }
    
    useEffect(() => {
        const getClients = async () => {
            const data = await fetchClients()

            setClients(data.map((client) => {
                return {
                    value: client._id,
                    label: `${client.firstname} ${client.lastname}`
                }
            }))
        }

        getClients()
        setStartDate(props.onDateClick)
    }, [ 
        props.userId,
        props.modalOpen,
        props.onDateClick,
        fetchClients
    ])

    useEffect(() => {
        setStart(moment(startDate).format("YYYY-MM-DD") + " " + moment(startTime).format("HH:mm:ss"))

        setEnd(moment(endDate).format("YYYY-MM-DD") + " " + moment(endTime).format("HH:mm:ss"))
    }, [
        startDate,
        startTime,
        endDate,
        endTime
    ])

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

        if (!clientId) {
            alert(alertMsgs.needClient)
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
        props.openNotification('Event added')
    }

    return (
        <div>
            <Modal
                isOpen={props.modalOpen}
                onRequestClose={() => props.onToggle(false)}
                className="credence-modal modal-event-add"
                contentLabel="Add Event"
            >
                <div className="addEventForm">
                    <h2>New Event</h2>
                    <form onSubmit={submitForm}>
                        <div className="input-wrapper">
                            <label htmlFor="title">Subject</label>
                            <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="eventtype">Category</label>
                            <select id="eventtype" required defaultValue={type || ''} onChange={e => setType(e.target.value) || ''}>
                                <option value=""></option>
                                <option value="meeting">Meeting</option>
                                <option value="conference">Conference</option>
                                <option value="holiday">Holiday</option>
                                <option value="birthday">Birthday</option>
                            </select>
                        </div>
                        <div className="input-wrapper start-date-time">
                            <div className="input-date">
                                <label htmlFor="startdate">Start Date</label>
                                <Datetime timeFormat={false} initialValue={props.onDateClick || startDate} onChange={date => setStartDate(date)} />
                            </div>
                            <div className="input-time">
                                <label htmlFor="starttime">Start Time</label>
                                <Datetime dateFormat={false} value={startTime} onChange={date => setStartTime(date)} />
                            </div>
                        </div>
                        <div className="input-wrapper end-date-time">
                            <div className="input-date">
                                <label htmlFor="enddate">End Date</label>
                                <Datetime timeFormat={false} initialValue={endDate} onChange={date => setEndDate(date)} />
                            </div>
                            <div className="input-time">
                                <label htmlFor="endtime">End Time</label>
                                <Datetime dateFormat={false} value={endTime} onChange={date => setEndTime(date)} />
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="clientlist">Connection</label>
                            <Select options={clients} isMulti="true" value={clientId || ''} onChange={e => setClientId(e) || ''} />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div className="input-wrapper submit-btn-wrapper">
                            <button className="btn btn-primary-reverse" onClick={() => props.onToggle(false)}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Event</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AddEvent