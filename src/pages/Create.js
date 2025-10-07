import React, { useState, useEffect } from "react";
import NoteForm from "../components/NoteForm";
import API from "../api";
import { useLocation, useNavigate } from "react-router-dom";

const Create = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  const editingNote = location.state?.note;

  const [note, setNote] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (editingNote) {
      setNote(editingNote);
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      let data;
      if (editingNote) {
        const { data: updatedNote } = await API.put(
          `/notes/${editingNote._id}`,
          note
        );
        data = updatedNote;
        window.alert("Note updated successfully");
      } else {
        const { data: createdNote } = await API.post("/notes", note);
        data = createdNote;
        window.alert("Note created successfully");
      }
      navigate("/dashboard", { state: { note: data } });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      window.alert(`Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-white text-[#1a1a1a] px-6 py-10 overflow-hidden">
      <img
        src="/assets/doodle-1.png"
        alt="doodle1"
        className="absolute top-10 left-10 w-24 pointer-events-none animate-floatSlow"
      />
      <img
        src="/assets/doodle-2.png"
        alt="doodle2"
        className="absolute top-1/4 right-5 w-40 pointer-events-none animate-float"
      />
      <img
        src="/assets/doodle-3.png"
        alt="doodle3"
        className="absolute bottom-16 left-1/3 w-40 pointer-events-none animate-rotateSoft"
      />
      <img
        src="/assets/doodle-5.png"
        alt="doodle4"
        className="absolute top-1/2 left-14 w-28 pointer-events-none animate-float"
      />
      <img
        src="/assets/doodle-4.png"
        alt="doodle5"
        className="absolute bottom-52 left-3/4 w-40 pointer-events-none animate-floatSlow"
      />
      <img
        src="/assets/doodle-6.png"
        alt="doodle6"
        className="absolute top-0 left-1/2 w-40 pointer-events-none animate-rotateSoft"
      />
      <img
        src="/assets/doodle-7.png"
        alt="doodle7"
        className="absolute bottom-5 right-8 w-40 pointer-events-none animate-float"
      />

      <div className="relative z-10 w-full max-w-xl">
        <NoteForm note={note} setNote={setNote} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Create;
