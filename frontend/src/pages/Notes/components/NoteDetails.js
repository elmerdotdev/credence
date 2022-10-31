import React from 'react'
import AddNote from './AddNote'
import Modal from 'react-modal'
import ViewNote from './ViewNote'
import { Link } from 'react-router-dom'

 //Modal Style
//  const customStyles = {
//     content: {
//       top: '50%',
//       left: '50%',
//       right: 'auto',
//       bottom: 'auto',
//       marginRight: '-50%',
//       transform: 'translate(-50%, -50%',
//       borderRadius: '15px'
//     },
//   };


const NoteDetails = ({ notes, close, onAdd, onEdit }) => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false)

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
                <Link to={`/notes/${notes.client_id}/${notes._id}`}
                    onClick={openModal} 
                    style={{cursor:'pointer'}}
                >
                        <div key={i}>
                        <h2>{notes.title}</h2>
                        <p>{notes.content}</p>
                        <p>{notes.client_id}</p>
                        </div>
                    
                </Link>
                ))}
            </section>
            <div className = "single-note">
                <Modal
                    isOpen={modalIsOpen}
                    viewModal={viewModal} 
                    closeModal={closeModal}
                    style={customStyles} 
                >
                    <ViewNote 
                        close={closeModal}
                        onEdit={onEdit}
                    />
                </Modal>
            </div>
        </div>

    )
}

export default NoteDetails