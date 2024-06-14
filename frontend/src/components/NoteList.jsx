import React, { useEffect, useState } from 'react';
import { viewList } from '../utils/services';

const ViewList = () => {
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



    return (
        <div data-testid="view-list">
            <h2>View Notes</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <li key={note._id}>
                            <>
                                <h3>{note.title}</h3>
                                <p>{note.content}</p>
                            </>
                        </li>
                    ))
                ) : (
                    <p>No notes available</p>
                )}
            </ul>
        </div>
    );
};

export default ViewList;
