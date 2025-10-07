import React, { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleEdit = (note) => {
    navigate("/create", { state: { note } });
  };

  const handleDelete = async (note) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await API.delete(`/notes/${note._id}`);
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));
    } catch (err) {
      console.error("Error deleting note:", err);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="relative p-6 min-h-screen bg-white text-[#1a1a1a] overflow-hidden">
      <img
        src="/assets/doodle-1.png"
        alt="doodle1"
        className="absolute top-8 left-1/4 w-32 pointer-events-none animate-float"
      />
      <img
        src="/assets/doodle-2.png"
        alt="doodle2"
        className="absolute top-1/3 right-8 w-40 pointer-events-none animate-floatSlow"
      />
      <img
        src="/assets/doodle-3.png"
        alt="doodle3"
        className="absolute bottom-10 left-1/4 w-28 pointer-events-none animate-rotateSoft"
      />
      <img
        src="/assets/doodle-4.png"
        alt="doodle4"
        className="absolute top-1/2 left-2/4 w-32 pointer-events-none animate-float"
      />
      <img
        src="/assets/doodle-5.png"
        alt="doodle5"
        className="absolute bottom-1/4 right-10 w-36 pointer-events-none animate-floatSlow"
      />
      <img
        src="/assets/doodle-6.png"
        alt="doodle6"
        className="absolute top-0 right-1/4 w-28 pointer-events-none animate-rotateSoft"
      />
      <img
        src="/assets/doodle-7.png"
        alt="doodle7"
        className="absolute bottom-5 left-10 w-32 pointer-events-none animate-floatSlow"
      />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Notes</h1>
          <Link
            to="/create"
            className="bg-[#1a1a1a] text-white px-4 py-2 rounded-md hover:scale-105 transition-all"
          >
            Create Note
          </Link>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
