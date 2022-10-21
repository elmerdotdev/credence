import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

const EditNote = ({ onEdit }) => {
    const [note, setNote] = useState({})
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            const res = await fetch(`http://localhost:5002/api/notes/633b6a81145c9d79405c54ea/${params.client_id}/${params.id}`);
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

    )
}

export default EditNote