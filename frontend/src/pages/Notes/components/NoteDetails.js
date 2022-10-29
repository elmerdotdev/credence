import React from 'react'
import AddNote from './AddNote'
import NoteList from './NoteList'
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

const NoteDetails = ({ notes, modalOpen, toggle, onAdd, viewNote, noteId }) => {
   
    return (
        <div>
            <Modal
                isOpen = {modalOpen}
            >
            <button onClick={() => toggle(false)}>Close</button>
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
            </Modal>
        </div>

    )
}

export default NoteDetails