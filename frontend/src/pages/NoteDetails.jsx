import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

const NoteDetails = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/custom-notes/${id}/`);
                setNote(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchNote();
    }, [id]);

    if (!note) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <Link to="/my-notes" className="btn btn-secondary mb-3">Back to List</Link>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">{note.title}</h2>
                    <p className="card-text">{note.description}</p>
                    <div className="row">
                        {note.image && (
                            <div className="col-md-6 mb-3">
                                <h5>Image</h5>
                                <img src={note.image} alt={note.title} className="img-fluid rounded" />
                            </div>
                        )}
                        {note.video && (
                            <div className="col-md-6 mb-3">
                                <h5>Video</h5>
                                <video src={note.video} className="w-100 rounded" controls />
                            </div>
                        )}
                    </div>
                </div>
                <div className="card-footer text-muted">
                    Created: {new Date(note.created_at).toLocaleString()}
                </div>
            </div>
        </div>
    );
};

export default NoteDetails;
