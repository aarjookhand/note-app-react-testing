import React from 'react';
import CreateNoteForm from '../components/CreateNoteForm';
import ViewList from '../components/NoteList';
import DeleteNote from '../components/DeleteNote';
import UpdateList from '../components/UpdateList';



const NotePage = () => {

    return (
        <div data-testid="note-page-div">
            <CreateNoteForm />       
            <ViewList/>        
            <DeleteNote />  
            <UpdateList />           
        </div>
    );
};

export default NotePage;
