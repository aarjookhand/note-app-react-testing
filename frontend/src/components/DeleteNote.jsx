import React, { useEffect, useState } from 'react';
import { viewList, deleteNote } from '../utils/services';




const DeleteNote = () => {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState('');




    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await viewList();
            if (response.status === 200) {
                setNotes(response.notes); // Assuming response.notes is the array of notes
            } else {
                setError('Failed to fetch notes');
            }
        } catch (error) {
            setError('Error fetching notes');
            console.error('Error fetching notes:', error);
        }
    };



    const handleDeleteNote = async (_id) => {
        try {
            const response = await deleteNote(_id);
            if (response.status === 200) {
                // Filter out the deleted note from the state
                setNotes(notes.filter(note => note._id !== _id));
                // refresh it everytime
                window.location.reload();
            } else {
                setError('Failed to delete note');
            }
        } catch (error) {
            setError('Error deleting note');
            console.error('Error deleting note:', error);
        }
    };



    return (
        <div data-testid= "delete-note">
            <h2>del Notes</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <li key={note._id}>
                        <h3>{note.title}</h3>
                                    <p>{note.content}</p>
                                    <button onClick={() => handleDeleteNote(note._id)}>Delete</button>


                        </li>
                    ))
                ) : (
                    <p>No notes available</p>
                )}
            </ul>
        </div>
    );
};

export default DeleteNote;
