import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Datetime from 'react-datetime';
import moment from 'moment';
import Select from 'react-select'

const NewEventModal = ({ onAdd, onOpen, onClose, fetchClients, notification, userId }) => {
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

    const alertMsgs = {
        invalid: "Enter a valid date",
        pastDate: "Start date in the past",
        futureDate: "Set future end date",
        needClient: "Need at least one connection"
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
    }, [fetchClients])

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
            notification(alertMsgs.invalid, false)
            return false
        }

        if (start < new Date()) {
            notification(alertMsgs.pastDate, false)
            return false
        }

        if (end < start) {
            notification(alertMsgs.futureDate, false)
            return false
        }

        if (!clientId) {
            notification(alertMsgs.needClient, false)
            return false
        }

        onAdd({
            title: title,
            description: description || '',
            start_date: start,
            end_date: end,
            type: type,
            client_id: clientId || '',
            user_id: userId
        })
    }

    return (
        <Modal
        className="credence-modal modal-event-add"
        isOpen={onOpen}
        onRequestClose={onClose}
        contentLabel="Add Event"
        closeTimeoutMS={500}
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
                            <Datetime timeFormat={false} initialValue={startDate} onChange={date => setStartDate(date)} />
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
                        <button type="button" className="btn btn-primary-reverse" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Event</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default NewEventModal