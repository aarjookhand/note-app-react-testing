import React from 'react';
import CreateNoteForm from '../components/CreateNoteForm';
import ViewList from '../components/NoteList';




const NotePage = () => {

    return (
        <div data-testid="note-page-div">
            <CreateNoteForm />       
            <ViewList/>
        
        </div>
    );
};

export default NotePage;
