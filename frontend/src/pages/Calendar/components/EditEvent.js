import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Datetime from 'react-datetime';
import moment from 'moment-timezone';
import Select from 'react-select'

Modal.setAppElement('body');

const EditEvent = (props) => {
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
    const fetchEvent = props.fetchEvent
    const fetchClients = props.fetchClients

    const alertMsgs = {
        invalid: "Enter a valid date",
        pastDate: "Start date in the past",
        futureDate: "Set future end date",
        needClient: "Need at least one connection"
    }
    
    useEffect(() => {
        setTitle(props.event.title)
        setDescription(props.event.description)
        setStart(props.event.start_date)
        setStartDate(moment(props.event.start_date).format("MM/DD/YYYY"))
        setStartTime(moment(props.event.start_date).format("hh:mm A"))
        setEnd(props.event.end_date)
        setEndDate(moment(props.event.end_date).format("MM/DD/YYYY"))
        setEndTime(moment(props.event.end_date).format("hh:mm A"))
        setType(props.event.type)
        setClientId(props.event.client_id)

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
    }, [
        props.event,
        props.userId,
        props.modalOpen,
        fetchEvent,
        fetchClients
    ])

    useEffect(() => {
        setStart(moment(startDate).tz("America/Vancouver").format("YYYY-MM-DD") + " " + moment(startTime, "hh:mm A").tz("America/Vancouver").format("HH:mm:ss"))

        setEnd(moment(endDate).tz("America/Vancouver").format("YYYY-MM-DD") + " " + moment(endTime, "hh:mm A").tz("America/Vancouver").format("HH:mm:ss"))
    }, [
        startDate,
        startTime,
        endDate,
        endTime
    ])

    const submitForm = (e) => {
        e.preventDefault()

        if (!start || !end) {
            props.openNotification(alertMsgs.invalid, false)
            return false
        }

        if (start < new Date()) {
            props.openNotification(alertMsgs.pastDate, false)
            return false
        }

        if (end < start) {
            props.openNotification(alertMsgs.futureDate, false)
            return false
        }

        if (!clientId) {
            props.openNotification(alertMsgs.needClient, false)
            return false
        }

        console.log({
            id: props.event._id,
            title: title,
            description: description || '',
            start_date: start,
            end_date: end,
            type: type,
            client_id: clientId || '',
            user_id: props.userId
        })

        props.onEdit({
            _id: props.event._id,
            title: title,
            description: description || '',
            start_date: start,
            end_date: end,
            type: type,
            client_id: clientId || '',
            user_id: props.userId
        })
    }

    return (
        <div>
            <Modal
                isOpen={props.modalOpen}
                onRequestClose={props.onToggle}
                className="credence-modal modal-event-edit"
                contentLabel="Edit Event"
                closeTimeoutMS={500}
            >
                <div className="editEventForm">
                    <h2>Edit Event</h2>
                    <form onSubmit={submitForm}>
                        <div className="input-wrapper">
                            <label htmlFor="title">Subject</label>
                            <input id="title" type="text" defaultValue={title} onChange={e => setTitle(e.target.value)} required />
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
                                <Datetime timeFormat={false} initialValue={startDate} onChange={date => setStartDate(date)} />
                            </div>
                            <div className="input-time">
                                <label htmlFor="starttime">Start Time</label>
                                <Datetime dateFormat={false} initialValue={startTime} onChange={date => setStartTime(date)} />
                            </div>
                        </div>
                        <div className="input-wrapper end-date-time">
                            <div className="input-date">
                                <label htmlFor="enddate">End Date</label>
                                <Datetime timeFormat={false} initialValue={endDate} onChange={date => setEndDate(date)} />
                            </div>
                            <div className="input-time">
                                <label htmlFor="endtime">End Time</label>
                                <Datetime dateFormat={false} initialValue={endTime} onChange={date => setEndTime(date)} />
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="clientlist">Connection</label>
                            <Select options={clients} isMulti="true" defaultValue={clientId || ''} onChange={e => setClientId(e) || ''} />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" defaultValue={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div className="input-wrapper submit-btn-wrapper">
                            <button type="button" className="btn btn-primary-reverse" onClick={props.onToggle}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Update Event</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default EditEvent