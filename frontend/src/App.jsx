import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotesList from './pages/NotesList';
import AddNote from './pages/AddNote';
import EditNote from './pages/EditNote';
import NoteDetails from './pages/NoteDetails';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('access');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/my-dashboard" />} />

        <Route path="/my-dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/my-notes" element={<PrivateRoute><NotesList /></PrivateRoute>} />
        <Route path="/create-note" element={<PrivateRoute><AddNote /></PrivateRoute>} />
        <Route path="/my-notes/:id" element={<PrivateRoute><NoteDetails /></PrivateRoute>} />
        <Route path="/modify-note/:id" element={<PrivateRoute><EditNote /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
