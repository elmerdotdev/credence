import React from 'react'
import { useEffect, useState } from 'react'
import NoteDetails from './components/NoteDetails'
import ViewNote from './components/ViewNote'
import EditNote from './components/EditNote'

const Notes = () => {
  const [clients, setClients] = useState(null)
  const [notes, setNotes] = useState(null)
  // let subtitle;
  const [noteDetailsIsOpen, setNoteDetailsIsOpen] = useState(false)
  const [viewNoteIsOpen, setViewNoteIsOpen] = useState(false)
  const [editNoteIsOpen, setEditNoteIsOpen] = useState(false)
  const [singleNoteId, setSingleNoteId] = useState('')
  const [clientId, setClientId] = useState('')
  

  useEffect(() => {
    const getClients = async () => {
      const res = await fetchClients();
      setClients(res)
    };

    const getNotes = async () => {
      const res = await fetchNotes();
      setNotes(res)
  }

    getNotes();
    getClients();
  }, [])

  //Fetch Clients
  const fetchClients = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/633b6a81145c9d79405c54ea`)
    const data = await response.json()

    if (response.ok) {
      return data
    }
  }

    //Fetch All Notes
    const fetchNotes = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/633b6a81145c9d79405c54ea`)
      const data = await response.json()

      if (response.ok) {
          return data
      }
    }

    //Fetch Note
    const fetchNote= async (id) => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/633b6a81145c9d79405c54ea/${notes.client_id}/${notes.id}`);
      
      const data = await response.json();

      return data;
    };


  //Note Details Modal
  const toggleNoteDetailsModal = (status) => {
    setNoteDetailsIsOpen(status)
  }

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
  console.log(id)
  pullClientId(client_id);
}

//Client ID
const pullClientId = (client_id) => {
  setClientId(client_id);
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

  setNotes([...notes, data])
}

// Edit Note
const editNote = async( title, content) => {
  const updNote = {
    title: title,
    content: content,
  }

  await fetch(`${process.env.REACT_APP_API_URL}/api/notes/633b6a81145c9d79405c54ea/${notes.client_id}/${notes.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(updNote),
  })
}

//Delete Note
const deleteNote = async (id) => {
  await fetch(`${process.env.REACT_APP_API_URL}/api/notes/633b6a81145c9d79405c54ea/${notes.client_id}/${notes.id}`, {
    method: 'DELETE',
  });

  setNotes(notes.filter((note) => note.id !==id ))
}

 
  return (
    <section className="clients">
      {clients && clients.map((clients) => (
      <button key={clients._id} onClick={() => toggleNoteDetailsModal(true)}>{clients.firstname} {clients.lastname}</button>
      ))}

      <div className="notes">

        <NoteDetails
          modalOpen = {noteDetailsIsOpen}
          toggle={toggleNoteDetailsModal}
          viewNote = {viewNote}
          notes = {notes}
          onAdd = {addNote}
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