import React from 'react'
import moment from 'moment'

const NoteList = ({notes, viewNote}) => {


    return (
        <div onClick = {() => viewNote(notes._id, notes.client_id)} style={{cursor:'pointer'}} className="notes-list-item">
            <span>{moment(notes.createdAt).format("D MMM")}</span>
            <h4>{notes.title}</h4>
            <p>{notes.content}</p>
        </div>
    )
}

export default NoteList