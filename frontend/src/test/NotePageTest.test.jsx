import '@testing-library/jest-dom'; 
import React from 'react';
import { render, screen } from '@testing-library/react';
import NotePage from '../views/notePage';

test('renders NotePage with child components', async () => {
    render(<NotePage />);

    // Check for the presence of CreateNoteForm component
    expect(screen.getByTestId('create-note-form')).toBeInTheDocument();

    // Check for the presence of ViewList component
    expect(screen.getByTestId('view-list')).toBeInTheDocument();

    // Check for the presence of DeleteNote component
    expect(screen.getByTestId('delete-note')).toBeInTheDocument();

    // // Check for the presence of UpdateList component
    // expect(screen.getByTestId('update-list')).toBeInTheDocument();
});
