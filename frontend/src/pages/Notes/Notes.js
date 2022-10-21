import React from 'react'
import { useEffect, useState } from 'react'
import NoteDetails from './components/NoteDetails'
import Modal from 'react-modal'

 //Modal Style
 const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%',
    borderRadius: '15px'
  },
};

Modal.setAppElement("body");

const Notes = () => {
  const [clients, setClients] = useState(null)
  const [notes, setNotes] = useState(null)
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false)
  

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
    const response = await fetch('http://localhost:5002/api/clients/633b6a81145c9d79405c54ea')
    const data = await response.json()

    if (response.ok) {
      return data
    }
  }

    //Fetch All Notes
    const fetchNotes = async () => {
      const response = await fetch('http://localhost:5002/api/notes/633b6a81145c9d79405c54ea')
      const data = await response.json()

      if (response.ok) {
          return data
      }
    }

    //Fetch Note
    const fetchNote= async (id) => {
      const response = await fetch(`http://localhost:5002/api/notes/633b6a81145c9d79405c54ea/${notes.client_id}/${notes.id}`);
      
      const data = await response.json();

      return data;
    };

  //Fetch Client
  // const fetchClient = async (_id) => {
  //   const response = await fetch(`/api/clients/633b6a81145c9d79405c54ea/${_id}}`)
  //   const data = await response.json()

  //   if (response.ok){
  //     return data
  //   }
  // }


  //Open Modal
  const openModal = () => {
    setIsOpen(true)
  }

  //Modal Style 
  const viewModal = () => {
    subtitle.style.color = '#f00';
  }

  //Close Modal 
  const closeModal = () => {
    setIsOpen(false);
  }

//Add Note
const addNote = async (note) => {
  const response = await fetch('http://localhost:5002/api/notes', {
    method: 'POST',
    headers: {
      'Content-type':'application/json'
    },
    body: JSON.stringify(note)
  })

  const data = await response.json()

  setNotes([...notes, data])
}

// Edite Note
const editNote = async(id, title, content) => {
  const noteToEdit = await fetchNote(id);
  const updNote = {
    ...noteToEdit,
    title: title,
    content: content,
  }

  await fetch(`http://localhost:5002/api/notes/633b6a81145c9d79405c54ea/${notes.client_id}/${notes.id}`, {
    method: 'PUT',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(updNote),
  })
}

 
  return (
    <div className="clients">
      {clients && clients.map((clients) => (
      <button key={clients._id} onClick={openModal}>{clients.firstname} {clients.lastname}</button>
      ))}
    <div className="notes" id='notes'>
      <Modal
        isOpen={modalIsOpen}
        viewModal={viewModal} 
        closeModal={closeModal}
        style={customStyles} 
      >
        <NoteDetails
          close={closeModal}
          onAdd={addNote}
          notes = {notes}
          onEdit = {editNote}
        />
      </Modal>
    </div>
    </div>
  )
}

export default Notes