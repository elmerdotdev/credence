import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

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

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            const res = await fetch(`http://localhost:5002/api/notes/633b6a81145c9d79405c54ea/${params.client_id}/${params.id}`);
            const data = await res.json();

            setNote(data);
        };

        fetchNote();
    }, [params]);

    return (
        <div className = "single-note-details">
            <div className="single-note-btns">
                <button onClick={() => navigate('/notes')}>Close</button>
                <Link to={`/notes/edit/${params.client_id}/${params.id}`}>
                    <button>Edit</button>
                </Link>
                <button>Delete</button>
            </div>
            <p>{note.title}</p>
            <p>{note.content}</p>
        </div>
    )

}

export default ViewNote