import React from 'react';

const NoteCard = ({note, onEdit, onDelete}) => {
    return (
        <div className='h-'>
            <h3 className='text-lg font-bold'>{note.title}</h3>
            <p className='text-sm text-gray-600'>{note.content}</p>
            <div className='flex justify-end'>
                <button className='text-blue-500' onClick={onEdit}>Edit</button>
                <button className='text-red-500' onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}

export default NoteCard;