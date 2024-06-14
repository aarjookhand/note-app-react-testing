import React, { useEffect, useState } from 'react';
import { viewList, editNote } from '../utils/services';

const UpdateList = () => {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState('');
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [editTitle, setEditTitle] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await viewList();
            if (response.status === 200) {
                setNotes(response.notes);
            } else {
                setError('Failed to fetch notes');
            }
        } catch (error) {
            setError('Error fetching notes');
            console.error('Error fetching notes:', error);
        }
    };

    const handleEditNote = async (_id) => {
        try {
            const updatedNote = await editNote(_id, { title: editTitle, content: editContent });
            if (updatedNote.status === 200) {
                const updatedNotes = notes.map(note => {
                    if (note._id === _id) {
                        return { ...note, title: editTitle, content: editContent };
                    }
                    return note;
                });

                setNotes(updatedNotes);
                setEditingNoteId(null);
                setEditTitle('');
                setEditContent('');
            } else {
                setError('Failed to update note');
            }
        } catch (error) {
            setError('Error updating note');
            console.error('Error updating note:', error);
        }
    };

    const cancelEdit = () => {
        setEditingNoteId(null);
        setEditTitle('');
        setEditContent('');
    };

    return (
        <div data-testid="update-list">
            <h2>Update Notes</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <li key={note._id}>
                            {editingNoteId === note._id ? (
                                <form onSubmit={(e) => { e.preventDefault(); handleEditNote(note._id); }}>
                                    <div>
                                        <label htmlFor={`editTitle_${note._id}`}>Title:</label>
                                        <input
                                            id={`editTitle_${note._id}`}
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`editContent_${note._id}`}>Content:</label>
                                        <textarea
                                            id={`editContent_${note._id}`}
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={cancelEdit}>Cancel</button>
                                </form>
                            ) : (
                                <>
                                    <h3>{note.title}</h3>
                                    <p>{note.content}</p>
                                    <button onClick={() => {
                                        setEditingNoteId(note._id);
                                        setEditTitle(note.title);
                                        setEditContent(note.content);
                                    }}>Edit</button>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No notes available</p>
                )}
            </ul>
        </div>
    );
};

export default UpdateList;
