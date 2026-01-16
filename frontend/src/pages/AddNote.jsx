import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AddNote = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) formData.append('image', image);
        if (video) formData.append('video', video);

        try {
            await api.post('/custom-notes/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/my-notes');
        } catch (err) {
            console.error(err);
            alert('Error creating note');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control" rows="5" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="mb-3">
                    <label>Image (Optional)</label>
                    <input type="file" className="form-control" accept="image/*" onChange={e => setImage(e.target.files[0])} />
                </div>
                <div className="mb-3">
                    <label>Video (Optional)</label>
                    <input type="file" className="form-control" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
                </div>
                <button type="submit" className="btn btn-success">Save Note</button>
            </form>
        </div>
    );
};

export default AddNote;
