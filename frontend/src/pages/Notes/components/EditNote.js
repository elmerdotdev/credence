import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

Modal.setAppElement("body");

const EditNote = ({ onEdit, modalOpen, toggle }) => {
    const [note, setNote] = useState({})
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/633b6a81145c9d79405c54ea/${params.client_id}/${params.id}`);
            const data = await res.json();

            setNote(data);
            setTitle(data.title);
            setContent(data.content);
        };

        fetchNote();
    }, [params]);


    const onSubmit = (e) => {
        e.preventDefault();

        if(!content) {
            alert('Please update content');
            return;
        }

        onEdit(params.id, title, content);

        navigate('/notes')
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
            <input type="submit" value="Save Note" className="submit-btn" />
        </form>
        </Modal>
    )
}

export default EditNote