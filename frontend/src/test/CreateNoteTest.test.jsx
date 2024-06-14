import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateNoteForm from '../components/CreateNoteForm';
import * as services from '../utils/services';

describe("CreateNoteForm Component : crud Operation", () => {
    it("should render the form correctly", () => {
        render(<CreateNoteForm />);

        expect(screen.getByRole('heading', { name: /create note/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create note/i })).toBeInTheDocument();
    });

    it("should display error if fields are empty", async () => {
        render(<CreateNoteForm />);
        
        fireEvent.click(screen.getByRole('button', { name: /create note/i }));
        expect(screen.getByText('Please fill out all fields')).toBeInTheDocument();
    });

    it("should call createNote with correct data on form submission", async () => {
        const createNoteSpy = jest.spyOn(services, 'createNote').mockResolvedValue({});

        render(<CreateNoteForm />);

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Title' } });
        fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Test Content' } });

        fireEvent.click(screen.getByRole('button', { name: /create note/i }));

        await waitFor(() => {
            expect(createNoteSpy).toHaveBeenCalledWith({ title: 'Test Title', content: 'Test Content' });
            expect(screen.getByText('Note created successfully')).toBeInTheDocument();
        });

        createNoteSpy.mockRestore();
    });

    it("should handle failure in createNote", async () => {
        const createNoteSpy = jest.spyOn(services, 'createNote').mockRejectedValue(new Error('Failed to create note'));

        render(<CreateNoteForm />);

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Title' } });
        fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Test Content' } });

        fireEvent.click(screen.getByRole('button', { name: /create note/i }));

        await waitFor(() => {
            expect(createNoteSpy).toHaveBeenCalledWith({ title: 'Test Title', content: 'Test Content' });
            expect(screen.getByText('Failed to create note')).toBeInTheDocument();
        });

        createNoteSpy.mockRestore();
    });
});
