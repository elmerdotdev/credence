import React, { useState } from 'react'

const AddNote = ({ onAdd, connection }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [client_id, setClientId] = useState(connection._id)
    const [user_id, setUserId] = useState('63645e4850049bfd1e89637a')
    const [activity_id, setActivityId] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()

        if (!content){
            alert('Please add content to note')
            return
        }

        onAdd({ title, content, client_id, user_id, activity_id })
        console.log({title, content, client_id, user_id, activity_id})

        setTitle('')
        setContent('')
    }

    return (
        <form className="add-note-form" onSubmit={onSubmit}>
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

    )
}

export default AddNote