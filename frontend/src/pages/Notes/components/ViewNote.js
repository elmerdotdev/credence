import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'

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

Modal.setAppElement("body");

const ViewNote = ({ notes, modalOpen, onDelete, toggle, clientId, noteId, toggleEdit }) => {
    const [note, setNote] = useState({})

    useEffect(() => {
        const fetchNote = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/63645e4850049bfd1e89637a/${clientId}/${noteId}`);
            const data = await res.json();

            setNote(data);
        };

        fetchNote();
    }, []);


    return (
        <div className = "single-note-details">
            <Modal
                isOpen = {modalOpen}
                className="credence-modal modal-notes-view"
                closeTimeoutMS={500}
            >
            <div className="single-note-btns">
                <div>
                    <i className="icon-close" onClick={() => toggle(false)}></i>
                </div>
                <div className="modal-control-buttons">
                    <button className="btn btn-primary-reverse" onClick={() => toggleEdit(true)}>
                        Edit
                        <i className="icon-edit"></i>
                    </button>
                    <button className="btn btn-primary-reverse" onClick={() => onDelete(notes.id)}>
                        Delete
                        <i className="icon-trash"></i>
                    </button>
                </div>
            </div>
            <div className="modal-notes-content">
                <h2>{note.title}</h2>
                <p>{note.content}</p>
            </div>
            </Modal>
        </div>
    )

}

export default ViewNote