import React from 'react'

const NoteList = ({notes, viewNote}) => {


    return (
        <div onClick = {() => viewNote(notes._id, notes.client_id)} style={{cursor:'pointer'}}>
        <h4>{notes.title}</h4>
        <p>{notes.content}</p>
        </div>
    )
}

export default NoteList