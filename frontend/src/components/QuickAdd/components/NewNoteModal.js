import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'

const NewNoteModal = ({ onAdd, onOpen, onClose, fetchClients, notification, userId }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [client_id, setClientId] = useState('')
    const [activity_id, setActivityId] = useState('')
    const [clients, setClients] = useState('')

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

    const onSubmit = (e) => {
        e.preventDefault()

        if (!content) {
            notification('Enter note content')
            return false
        }

        onAdd({
            title: title,
            client_id: client_id.value,
            content: content,
            user_id: userId,
            activity_id: activity_id
        })
    }
    
    return (
        <Modal
            className="credence-modal modal-notes-edit"
            isOpen={onOpen}
            onRequestClose={onClose}
            contentLabel="Add Note"
            closeTimeoutMS={500}
        >
            <form className="new-note-form" onSubmit={onSubmit}>
                <h2>New Note</h2>
                <div className="input-wrapper">
                    <label>Subject</label>
                    <input 
                        type="text"
                        placeholder = "Your Note Subject/Title Here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="clientlist">Connection</label>
                    <Select options={clients} value={client_id} onChange={e => setClientId(e) || 'e'} />
                </div>
                <div className="input-wrapper">
                    <label>Content</label>
                    <textarea
                        type="text"
                        placeholder = "Your Note Content Here"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="input-wrapper submit-btn-wrapper">
                    <button type="button"  className="btn btn-primary-reverse" onClick={onClose}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Note</button>
                </div>
            </form>
        </Modal>
    )
}

export default NewNoteModal


