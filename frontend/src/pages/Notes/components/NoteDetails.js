import React from 'react'
import AddNote from './AddNote'
import NoteList from './NoteList'

const NoteDetails = ({ notes, onAdd, viewNote, noteId }) => {
   
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