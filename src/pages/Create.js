import React, { useState, useEffect } from "react";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import API from "../api";
import {useLocation, useNavigate} from "react-router-dom";

const Create = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
    if(editingNote){
      setNote(editingNote);
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try{
      let data;
      if(editingNote){
        const {data: updatedNote} = await API.put(`/notes/${editingNote._id}`, note);
        data = updatedNote;
        window.alert("Note updated successfully");
      } else {
        const {data: createdNote} = await API.post("/notes", note);
        data = createdNote;
        window.alert("Note created successfully");
      }
      navigate("/dashboard", {state: {note: data}});
      }catch (err) {
        setError(err.response?.data?.message || err.message);
        window.alert(`Error: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row justify-center items-center px-6 md:px-16 py-10 bg-white text-[#1a1a1a]"
      style={{
        backgroundImage: "url('/assets/bg-pattern.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <NoteForm note={note} setNote={setNote} handleSubmit={handleSubmit} />
      <NoteCard note={note} />
    </div>
  );
};

export default Create;
