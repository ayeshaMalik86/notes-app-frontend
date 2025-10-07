import React from "react";

const NoteForm = ({ note, setNote, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full md:w-1/2 bg-white text-[#1a1a1a] rounded-2xl p-6 shadow-lg mb-10 md:mb-0 md:mr-8">
      <h2 className="text-2xl font-bold mb-6">Create a Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Enter note title"
            className="w-full p-3 rounded-md bg-transparent border border-gray-500  placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">Content</label>
          <textarea
            name="content"
            value={note.content}
            onChange={handleChange}
            placeholder="Write your note..."
            rows="4"
            className="w-full p-3 rounded-md bg-transparent border border-gray-500  placeholder-gray-400 resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">Tags</label>
          <input
            type="text"
            name="tags"
            value={note.tags}
            onChange={handleChange}
            placeholder="e.g. work, personal"
            className="w-full p-3 rounded-md bg-transparent border border-gray-500  placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-[#1a1a1a] text-white font-semibold rounded-md hover:scale-105 transition-all"
        >
          Save Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
