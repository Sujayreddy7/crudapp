import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({ total: 0, withMedia: 0, lastNote: null });

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get('/custom-notes/');
                const notes = res.data;
                const withMedia = notes.filter(n => n.image || n.video).length;
                setStats({
                    total: notes.length,
                    withMedia,
                    lastNote: notes.length > 0 ? notes[0] : null // Assumes ordered by created_at desc
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchNotes();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Dashboard</h2>
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-header">Total Notes</div>
                        <div className="card-body">
                            <h5 className="card-title">{stats.total}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-header">Notes with Media</div>
                        <div className="card-body">
                            <h5 className="card-title">{stats.withMedia}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-info mb-3">
                        <div className="card-header">Last Created Note</div>
                        <div className="card-body">
                            <h5 className="card-title">{stats.lastNote ? stats.lastNote.title : 'None'}</h5>
                            <Link to="/my-notes" className="btn btn-light btn-sm mt-2">View All</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
