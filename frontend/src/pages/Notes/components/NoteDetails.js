import React from 'react'
import { useEffect, useState } from 'react'
import AddNote from './AddNote'


const NoteDetails = ({close, onAdd}) => {
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
        <div>
            <button onClick={() => close()}>Close</button>
            <section className = "add-note">
                <AddNote 
                    onAdd = {onAdd}
                />
            </section>
            <section className="note-details">
                {notes && notes.map((notes, i) => (
                    <div key={i}>
                    <h2>{notes.title}</h2>
                    <p>{notes.content}</p>
                    </div>
                ))}
            </section>
        </div>

    )
}

export default NoteDetails