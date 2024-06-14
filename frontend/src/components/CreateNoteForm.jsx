import React, { useState } from 'react';
import {createNote} from '../utils/services'; 

const CreateNoteForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleCreateNote = async () => {
        try {
            if (!title || !content) {
                setError('Please fill out all fields');
                return;
            }

            const noteData = { title, content };
            const response = await createNote(noteData);

        
            setSuccessMessage('Note created successfully');
            // refresh it everytime
            window.location.reload();
            setTitle('');
            setContent('');
            setError('');
        } catch (err) {
            setError('Failed to create note');
            console.error('Error creating note:', err);
        }
    };

    return (
        <div data-testid="create-note-form">
            <h2>Create Note</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    required
                />
            </div>
            <div>
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter content"
                    required
                ></textarea>
            </div>
            <button onClick={handleCreateNote}>Create Note</button>
        </div>
    );
};
export default CreateNoteForm;
