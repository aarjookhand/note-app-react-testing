import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViewList from '../components/NoteList';
import * as services from '../utils/services';

describe("ViewList Component", () => {
    // Test initial rendering of the component
    it("should render the component correctly", async () => {
        const viewListSpy = jest.spyOn(services, 'viewList').mockResolvedValue({
            status: 200,
            notes: [{ _id: '1', title: 'Test Note 1', content: 'Content 1' }]
        });

        render(<ViewList />);

        expect(screen.getByRole('heading', { name: /view notes/i })).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Test Note 1')).toBeInTheDocument();
            expect(screen.getByText('Content 1')).toBeInTheDocument();
        });

        viewListSpy.mockRestore();
    });

    // Test handling of error during fetching notes
    it("should display error if fetching notes fails", async () => {
        const viewListSpy = jest.spyOn(services, 'viewList').mockRejectedValue(new Error('Failed to fetch notes'));

        render(<ViewList />);

        await waitFor(() => {
            expect(screen.getByText('Error fetching notes')).toBeInTheDocument();
        });

        viewListSpy.mockRestore();
    });

    // Test rendering with no notes
    it("should display message if no notes are available", async () => {
        const viewListSpy = jest.spyOn(services, 'viewList').mockResolvedValue({
            status: 200,
            notes: []
        });

        render(<ViewList />);

        await waitFor(() => {
            expect(screen.getByText('No notes available')).toBeInTheDocument();
        });

        viewListSpy.mockRestore();
    });

    // Test rendering if fetch notes response is not 200
    it("should handle non-200 status on fetching notes", async () => {
        const viewListSpy = jest.spyOn(services, 'viewList').mockResolvedValue({ status: 500 });

        render(<ViewList />);

        await waitFor(() => {
            expect(screen.getByText('Failed to fetch notes')).toBeInTheDocument();
        });

        viewListSpy.mockRestore();
    });
});
