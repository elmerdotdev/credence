import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'

const NewNote = () => {
    const userID = JSON.parse(localStorage.getItem('user'))._id
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [client_id, setClientId] = useState('')
    const [user_id, setUserId] = useState(userID)
    const [activity_id, setActivityId] = useState('')
    const [clients, setClients] = useState('')
    const [notes, setNotes] = useState('')

    useEffect(() => {
        const getClients = async () => {
            const data = await fetchClients()
            console.log(data)

        setClients(data.map((client) => {
            return {
                value: client._id,
                label: `${client.firstname} ${client.lastname}`
            }
        }))
        }
        getClients()
    }, [])

    const fetchClients = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}`)
        const data = await response.json()

        if (response.ok) {
            return data
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!content){
            alert('Please add content to note')
            return
        }

        const newNoteToAdd = {
            title: title,
            client_id: client_id.value,
            content: content,
            user_id: userID,
            activity_id: activity_id
        }

        addNewNote(newNoteToAdd)
        setTitle('')
        setClientId('')
        setContent('')
    }

    const addNewNote = async (note) => {
        console.log(note)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes`, {
          method: 'POST',
          headers: {
            'Content-type':'application/json'
          },
          body: JSON.stringify(note)
        })
      
        const data = await response.json()
      
        setNotes(data)
      }

    return (
        <div>
        <Modal>
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
                <button type="submit" className="btn btn-primary">Save Note</button>
            </div>
        </form>
        </Modal>
        </div>

    )
}

export default NewNote