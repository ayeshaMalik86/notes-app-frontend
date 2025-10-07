import React from "react";

const NoteCard = ({ note }) => {
  return (
    <div className="w-full md:w-1/2 bg-white text-[#1a1a1a] rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Note</h2>
      {note.title || note.content || note.tags ? (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold border-b border-gray-600 pb-2">
            {note.title || "Untitled"}
          </h3>
          <p className="text-gray-800 whitespace-pre-line">
            {note.content || "No content yet..."}
          </p>
          {note.tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {note.tags.split(",").map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-gray-300 text-black rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-400">No note created yet.</p>
      )}
    </div>
  );
};

export default NoteCard;
