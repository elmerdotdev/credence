import React from 'react'
import { useEffect, useState } from 'react'
import NoteDetails from './components/NoteDetails'
import ViewNote from './components/ViewNote'
import EditNote from './components/EditNote'
import { useNavigate, useLocation } from 'react-router-dom';

// TODO: accept isOpenNote and noteId as parameters
const Notes = ( connection ) => {
  const [notes, setNotes] = useState(null)
  const [viewNoteIsOpen, setViewNoteIsOpen] = useState(false)
  const [editNoteIsOpen, setEditNoteIsOpen] = useState(false)
  const [singleNoteId, setSingleNoteId] = useState('')
  const [clientId, setClientId] = useState('')
  const [connectionId, setConnectionId ] = useState(connection.connection._id)
  const [currParams, setCurrParams] = useState('');

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const getNotes = async () => {
      const res = await fetchNotes();
      setNotes(res);
  };
    getNotes()
      let params = (new URL(document.location)).searchParams;
    if (params.toString().length > 0 && params.toString().search("noteId") != -1) {
      viewNote(params.get("noteId"), params.get("connectionId"))
      setCurrParams(params.toString())
    }
  }, [location])

    //Fetch All Notes For Client
    const fetchNotes = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/63645e4850049bfd1e89637a/${connectionId}`)
      const data = await response.json()

      if (response.ok) {
          return data
      }
    }

    // Fetch Note
    // const fetchNote= async (id) => {
    //   const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/633b6a81145c9d79405c54ea/${notes.client_id}/${notes.id}`);
      
    //   const data = await response.json();

    //   return data;
    // };

//View Single Note Modal
  const toggleViewNoteModal = (status) => {
    setViewNoteIsOpen(status)
  }

//Edit Note Modal
  const toggleEditNoteModal = (status) => {
    setEditNoteIsOpen(status)
  }

//View Single Note
const viewNote = (id, client_id) => {
  toggleViewNoteModal(true);
  setSingleNoteId(id);
  pullClientId(client_id);
}

//Client ID
const pullClientId = (client_id) => {
  setClientId(client_id);
}

//Add Note
const addNote = async (note) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes`, {
    method: 'POST',
    headers: {
      'Content-type':'application/json'
    },
    body: JSON.stringify(note)
  })

  const data = await response.json()

  setNotes([data, ...notes ])
}

// Edit Note
const editNote = async(id, title, content ) => {

  const updNote = {
    id: id,
    title: title,
    content: content
  }

  await fetch(`${process.env.REACT_APP_API_URL}/api/notes/${singleNoteId}`, {
    method: 'PATCH',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(updNote),
  });

  const res = await fetchNotes();
  setNotes(res);
  setEditNoteIsOpen(false)
  setViewNoteIsOpen(false)
}

//Delete Note
const deleteNote = async () => {
  await fetch(`${process.env.REACT_APP_API_URL}/api/notes/${singleNoteId}`, {
    method: 'DELETE',
  });

  setNotes(notes.filter((note) => note._id !== singleNoteId ))
  setViewNoteIsOpen(false)
}

 
  return (
    <section>

      <div className="notes">

        <NoteDetails
          viewNote = {viewNote}
          notes = {notes}
          onAdd = {addNote}
          connection = {connection}
        />

        {viewNoteIsOpen &&
        <ViewNote
          notes = {notes}
          modalOpen = {viewNoteIsOpen}
          toggle = {toggleViewNoteModal}
          clientId = {clientId}
          noteId = {singleNoteId}
          toggleEdit = {toggleEditNoteModal}
          onDelete = {deleteNote}
        />
        }

        {editNoteIsOpen &&
        <EditNote
          toggle = {toggleEditNoteModal}
          modalOpen = {editNoteIsOpen}
          clientId = {clientId}
          noteId = {singleNoteId}
          onEdit = {editNote}
          onDelete = {deleteNote}
        />
        }
      </div>
    </section>
  )
}

export default Notes