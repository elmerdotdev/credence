import { useState, useEffect } from 'react';
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

const EditNote = ({ modalOpen, toggle, onEdit, clientId, noteId, openNotification }) => {
    const [note, setNote] = useState({})
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        const fetchNote = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/63645e4850049bfd1e89637a/${clientId}/${noteId}`);
            const data = await res.json();

            setNote(data);
            setTitle(data.title);
            setContent(data.content);
        };

        fetchNote();
    }, []);


    const onSubmit = (e) => {
        e.preventDefault();

        if(!content) {
            openNotification('Enter note content', false);
            return false;
        }

        onEdit(noteId, title, content);
    };

    return (
        <Modal
            isOpen = {modalOpen}
            className = "credence-modal modal-notes-edit"
            closeTimeoutMS={500}
        >
        <h2>Edit Note</h2>
        <form className='edit-note' onSubmit={onSubmit}>
            <div class="input-wrapper">
                <label>Subject</label>
                <input 
                    type="text"
                    placeholder="Add Subject"
                    defaultValue={note.title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="input-wrapper">
                <label>Content</label>
                <textarea 
                    type="text"
                    placeholder="Add Content"
                    defaultValue={note.content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="input-wrapper submit-btn-wrapper">
                <button type="button" className="btn btn-primary-reverse" onClick={() => toggle(false)}>Close</button>
                <button type="submit" className="btn btn-primary" onClick={onSubmit}>Save Note</button>
            </div>
        </form>
        </Modal>
    )
}

export default EditNote