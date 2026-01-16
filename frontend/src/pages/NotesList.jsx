import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';

const NotesList = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await api.get('/custom-notes/');
            setNotes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/custom-notes/${id}/`);
                fetchNotes();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>My Notes</h2>
                <Link to="/create-note" className="btn btn-primary">Add Note</Link>
            </div>
            <div className="row">
                {notes.map(note => (
                    <div className="col-md-4 mb-4" key={note.id}>
                        <div className="card h-100">
                            {note.image && <img src={note.image} className="card-img-top" alt={note.title} style={{ height: '200px', objectFit: 'cover' }} />}
                            {note.video && !note.image && <video src={note.video} className="card-img-top" controls style={{ height: '200px', objectFit: 'cover' }} />}
                            <div className="card-body">
                                <h5 className="card-title">{note.title}</h5>
                                <p className="card-text text-truncate">{note.description}</p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/my-notes/${note.id}`} className="btn btn-info btn-sm">View</Link>
                                    <Link to={`/modify-note/${note.id}`} className="btn btn-warning btn-sm">Edit</Link>
                                    <button onClick={() => handleDelete(note.id)} className="btn btn-danger btn-sm">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotesList;
