import React, { useState } from "react";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import API from "../api";

const Create = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try{
      const {data} = await API.post("/notes", note);
      setSuccess(true);
      setNote({title: "", content: "", tags: ""});
      console.log("Note saved:", data);
      window.alert("Note saved successfully");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error("Error saving note:", err);
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
