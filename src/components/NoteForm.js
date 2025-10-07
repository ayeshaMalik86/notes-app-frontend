import React, { useState, useEffect } from 'react';

const NoteForm = ({onSubmit, selectedNote}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if(selectedNote) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content);
            setTags(selectedNote.tags);
        }
    }, [selectedNote]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title || !content) return alert('Please fill in all fields');
        onSubmit({title, content, tags: tags.split(',').map(t=>t.trim())});
        setTitle('');
        setContent('');
        setTags([]);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
            <textarea placeholder='Content' value={content} onChange={(e)=>setContent(e.target.value)} />
            <input placeholder='Tags' value={tags} onChange={(e)=>setTags(e.target.value)} />
            <button type='submit'>{selectedNote ? 'Update' : 'Create'}</button>
        </form>
    )
}

export default NoteForm;