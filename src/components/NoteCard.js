import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"; 

const NoteCard = ({ note, onEdit, onDelete }) => {
  const tags = Array.isArray(note.tags)
    ? note.tags
    : (note.tags || "").split(",").map(tag => tag.trim()).filter(Boolean);

  return (
    <div className="w-full border border-black bg-white text-[#1a1a1a] rounded-2xl p-6 shadow-lg relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <PencilIcon
          className="w-6 h-6 text-gray-500 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => onEdit(note)}
        />
        <TrashIcon
          className="w-6 h-6 text-gray-500 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => onDelete(note)}
        />
      </div>
      {note.title || note.content || tags.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold border-b border-gray-600 pb-2">
            {note.title || "Untitled"}
          </h3>
          <p className="text-gray-800 whitespace-pre-line">
            {note.content || "No content yet..."}
          </p>
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-gray-300 text-black rounded-full"
                >
                  {tag}
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
