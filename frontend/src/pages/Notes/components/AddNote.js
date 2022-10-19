import React, { useState } from 'react'

const AddNote = ({ onAdd }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [client_id, setClientId] = useState('633b2f54c6a3c84891b1bf72')
    const [user_id, setUserId] = useState('633b6a81145c9d79405c54ea')
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
        <form className = "add-note" onSubmit={onSubmit}>
            <div className="note-form">
                <label>Subject</label>
                <input 
                    type="text"
                    placeholder = "Your Note Subject/Title Here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="note-form">
                <label>Content</label>
                <input 
                    type="text"
                    placeholder = "Your Note Content Here"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <input type="submit" 
            value="Save Note"
            className='submit-btn'
            />
        </form>

    )
}

export default AddNote