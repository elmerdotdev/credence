import React, { useEffect, useState } from 'react'
import AddNote from './AddNote'
import NoteList from './NoteList'

const NoteDetails = ({notes, onAdd, viewNote, noteId }) => {
    // const [allClientNotes, setallClientNotes] = useState(null)

    // useEffect(() => {

    //     const getNotes = async () => {
    //       const clientNotes = await fetchNotes();
    //       const viewClientNotes = clientNotes.filter((clientNote) => {return clientNote.client_id})
    //       console.log(viewClientNotes)

    //       setallClientNotes(viewClientNotes);
    //   };
    
    //     getNotes();
    //   }, [])
    
        //Fetch All Notes For Specific Client
        // const fetchNotes = async () => {
        //   const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/63645e4850049bfd1e89637a`)
        //   const data = await response.json()
    
        //   if (response.ok) {
        //       return data
        //   }
        // }

    return (
        <div>
            <section className = "add-note">
                <AddNote 
                    onAdd = {onAdd}
                />
            </section>
            <section className="note-details" >
            {notes && notes.map((notes, i) => (
                    <NoteList 
                        key={i} 
                        notes = {notes}
                        viewNote = {viewNote}
                        nodeId = {noteId}
                    />
                ))}
            </section>
        </div>

    )
}

export default NoteDetails