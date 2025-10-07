import React , {useState, useEffect} from "react";
import NoteCard from "../components/NoteCard";
import API from "../api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchNotes = async () => {
        try{
            setLoading(true);
            setError(null);

            await new Promise(resolve => setTimeout(resolve, 1000));

            const res = await API.get("/notes");
            setNotes(res.data);
        } catch (err) {
            console.error("Error fetching notes:", err);
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleEdit = (note) => {
        navigate("/create", {state: {note}});
    }

    const handleDelete = async (note) => {
        if(!window.confirm("Are you sure you want to delete this note?")) return;

        try{
            await API.delete(`/notes/${note._id}`);

            setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));
        } catch (err) {
            console.error("Error deleting note:", err);
            setError(err.response?.data?.message || err.message);
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold mb-6">My Notes</h1>
                <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create Note</Link>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <NoteCard 
                    key={note._id} 
                    note={note} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;