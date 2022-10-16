import React from 'react'
import { useEffect, useState } from 'react'

const NoteDetails = () => {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        const getNotes = async () => {
            const res = await fetchNotes();
            setNotes(res)
        }

        getNotes();
    }, [])

    //Fetch All Notes
    const fetchNotes = async () => {
        const response = await fetch('http://localhost:5002/api/notes/633b6a81145c9d79405c54ea')
        const data = await response.json()

        if (response.ok) {
            return data
        }
    }

    //Fetch Single Note
    // const fetchNote = async (client_id, id) => {
    //     const response = await fetch(`http://localhost:5002/api/notes/633b6a81145c9d79405c54ea/${client_id}/${id}`)
    // }

    return (
        <div className="note-details">
            {notes && notes.map((notes) => (
                <p key={notes._id}>{notes.content}</p>
            ))}
        </div>

    )
}

export default NoteDetails