import React from 'react';
import CreateNoteForm from '../components/CreateNoteForm';
import ViewList from '../components/NoteList';
import DeleteNote from '../components/DeleteNote';




const NotePage = () => {

    return (
        <div data-testid="note-page-div">
            <CreateNoteForm />       
            <ViewList/>
        
            <DeleteNote />  
        </div>
    );
};

export default NotePage;
