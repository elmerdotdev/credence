import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement("body");

const ViewNote = ({ notes, userID, modalOpen, onDelete, toggle, clientId, noteId, toggleEdit }) => {
    const [note, setNote] = useState({})
    const [client, setClient] = useState('')

    useEffect(() => {
        const fetchNoteClient = async () => {
            const note = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/${userID}/${clientId}/${noteId}`);
            const noteData = await note.json();

            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}/${noteData.client_id}`);
            const client = await res.json();

            
            setClient(client);
            setNote(noteData);
        };

        fetchNoteClient();
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
                <h3><span>Note</span></h3>
                <h2>{note.title}</h2>
                <div className = "single-note-client-information">
                    <img src={client.photo} alt={client.firstname} />
                    <h4>{client.firstname} {client.lastname}</h4>
                </div>
                <p>{note.content}</p>
            </div>
            </Modal>
        </div>
    )

}

export default ViewNote