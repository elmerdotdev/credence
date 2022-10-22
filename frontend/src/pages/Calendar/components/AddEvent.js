import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Datetime from 'react-datetime';

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

const AddEvent = (props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [type, setType] = useState('')
    const [clientId, setClientId] = useState()
    
    useEffect(() => {

    }, [])

    const submitForm = (event) => {
        event.preventDefault()

        alert('1')
    }

    return (
        <div>
            <Modal
                isOpen={props.modalOpen}
                onRequestClose={() => props.onToggle(false)}
                style={customStyles}
                contentLabel="Add Event"
            >
                <button onClick={() => props.onToggle(false)}>Close</button>
                <h2>Add Event</h2>
                <form className="addEventForm" onSubmit={submitForm}>
                    <div className="input-wrapper">
                        <label htmlFor="title">Event name</label>
                        <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" cols="30" rows="10"></textarea>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="startdate">Start</label>
                        <Datetime value={start} onChange={date => setStart(date)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="enddate">End</label>
                        <Datetime value={start} onChange={date => setEnd(date)} />
                    </div>
                    <div className="input-wrapper">
                        <select>

                        </select>
                    </div>
                    <input type="submit" value="Add New Event" />
                </form>
            </Modal>
        </div>
    )
}

export default AddEvent