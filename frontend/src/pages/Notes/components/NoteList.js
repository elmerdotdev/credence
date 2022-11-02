import React from 'react'

const NoteList = ({notes, viewNote}) => {


    return (
        <div onClick = {() => viewNote(notes._id, notes.client_id)} style={{cursor:'pointer'}}>
        <h2>{notes.title}</h2>
        <p>{notes.content}</p>
        </div>
    )
}

export default NoteList