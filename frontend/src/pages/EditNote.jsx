import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const EditNote = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentVideo, setCurrentVideo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/custom-notes/${id}/`);
                setTitle(res.data.title);
                setDescription(res.data.description);
                setCurrentImage(res.data.image);
                setCurrentVideo(res.data.video);
            } catch (err) {
                console.error(err);
                navigate('/my-notes');
            }
        };
        fetchNote();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) formData.append('image', image);
        if (video) formData.append('video', video);

        try {
            await api.put(`/custom-notes/${id}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/my-notes');
        } catch (err) {
            console.error(err);
            alert('Error updating note');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Edit Note</h2>
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
                    <label>Current Image</label>
                    {currentImage && <div className="mb-2"><img src={currentImage} alt="current" width="200" /></div>}
                    <input type="file" className="form-control" accept="image/*" onChange={e => setImage(e.target.files[0])} />
                </div>
                <div className="mb-3">
                    <label>Current Video</label>
                    {currentVideo && <div className="mb-2"><video src={currentVideo} width="200" controls /></div>}
                    <input type="file" className="form-control" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
                </div>
                <button type="submit" className="btn btn-warning">Update Note</button>
            </form>
        </div>
    );
};

export default EditNote;
