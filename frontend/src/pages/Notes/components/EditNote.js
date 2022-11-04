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

const EditNote = ({ modalOpen, toggle, onEdit, clientId, noteId }) => {
    const [note, setNote] = useState({})
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        const fetchNote = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/633b6a81145c9d79405c54ea/${clientId}/${noteId}`);
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
            alert('Please update content');
            return;
        }

        onEdit(noteId, title, content);
    };

    return (
        <Modal
            isOpen = {modalOpen}
        >
        <button onClick={() => toggle(false)}>Close</button>
        <form className='edit-note' onSubmit={onSubmit}>
            <div className = "edit-note-form">
                <label>Subject</label>
                <input 
                    type="text"
                    placeholder="Add Subject"
                    defaultValue={note.title}
                    onChange={(e) => setTitle(e.target.value)}
                 />
            </div>
            <div className="edit-note-form">
                <label>Content</label>
                <textarea 
                    type="text"
                    placeholder="Add Content"
                    defaultValue={note.content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <input type="submit" value="Save Note" className="submit-btn" onClick={onSubmit} />
        </form>
        </Modal>
    )
}

export default EditNote