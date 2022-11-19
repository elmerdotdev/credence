import React, { useState } from 'react'
import Notification from '../../components/Notification/Notification'
import NewConnectionModal from './components/NewConnectionModal'
import NewEventModal from './components/NewEventModal'
import NewNoteModal from './components/NewNoteModal'

const QuickAdd = () => {
    const [quickAddShow, setQuickAddShow] = useState(false)
    const [notificationOpen, setNotificationOpen] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState('')
    const [userID, setUserID] = useState('63645e4850049bfd1e89637a');

    // Modal states
    const [noteModal, setNoteModal] = useState(false)
    const [connectionModal, setConnectionModal] = useState(false)
    const [eventModal, setEventModal] = useState(false)

    // Open notification
    const openNotification = (message) => {
        setNotificationMessage(message)
        setNotificationOpen(true)
    }

    // Add Note
    const addNote = async (newNote) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/notes`, {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(newNote)
        })

        setNoteModal(false)
        openNotification('Note added')
    }

    // Add Connection
    const addConnection = async (newClient) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/clients`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newClient),
        })

        setConnectionModal(false)
        openNotification('Connection added')
    }

    // Add Event
    const addEvent = async (newEvent) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/activities`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newEvent)
        })

        setEventModal(false)
        openNotification('Event added')
    }

    // Get clients
    const fetchClients = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}`)
        const data = await res.json()

        return data
    }

    return (
        <>
            <div className="quick-add-wrapper">
                <button className={quickAddShow ? 'header-quick-add quick-add-visible' : 'header-quick-add'} onClick={() => setQuickAddShow(!quickAddShow)}>
                    <span>Quick Add</span>
                    <i className="icon-plus"></i>
                </button>

                <ul>
                    <li onClick={() => { setNoteModal(true); setQuickAddShow(false) }}><span>Note</span><i className="icon-note"></i></li>
                    <li onClick={() => { setConnectionModal(true); setQuickAddShow(false) }}><span>Connection</span><i className="icon-connection"></i></li>
                    <li onClick={() => { setEventModal(true); setQuickAddShow(false) }}><span>Event</span><i className="icon-calendar"></i></li>
                </ul>
            </div>

            {notificationOpen && 
            <Notification message={notificationMessage} onClose={() => setNotificationOpen(false)} />
            }

            <NewNoteModal onAdd={addNote} onOpen={noteModal} onClose={() => setNoteModal(false)} fetchClients={fetchClients} userId={userID} />
            
            <NewConnectionModal onAdd={addConnection} onOpen={connectionModal} onClose={() => setConnectionModal(false)} />

            <NewEventModal onAdd={addEvent} onOpen={eventModal} onClose={() => setEventModal(false)} fetchClients={fetchClients} userId={userID} />
        </>
    )
}

export default QuickAdd