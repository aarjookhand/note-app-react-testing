import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteNote from '../components/DeleteNote';
import * as services from '../utils/services';

describe("DeleteNote Component", () => {
    it("should render the component correctly", async () => {
        const viewListSpy = jest.spyOn(services, 'viewList').mockResolvedValue({
            status: 200,
            notes: [{ _id: '1', title: 'Test Note 1', content: 'Content 1' }]
        });

        render(<DeleteNote />);

        expect(screen.getByRole('heading', { name: /del notes/i })).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Test Note 1')).toBeInTheDocument();
            expect(screen.getByText('Content 1')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
        });

        viewListSpy.mockRestore();
    });

    // Test handling of error during fetching notes
    it("should display error if fetching notes fails", async () => {
        const viewListSpy = jest.spyOn(services, 'viewList').mockRejectedValue(new Error('Failed to fetch notes'));

        render(<DeleteNote />);

        await waitFor(() => {
            expect(screen.getByText('Error fetching notes')).toBeInTheDocument();
        });

        viewListSpy.mockRestore();
    });

    // Test handling of note deletion
    it("should handle note deletion correctly", async () => {
        const viewListSpy = jest.spyOn(services, 'viewList').mockResolvedValue({
            status: 200,
            notes: [{ _id: '1', title: 'Test Note 1', content: 'Content 1' }]
        });
        const deleteNoteSpy = jest.spyOn(services, 'deleteNote').mockResolvedValue({ status: 200 });

        render(<DeleteNote />);

        await waitFor(() => {
            expect(screen.getByText('Test Note 1')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: /delete/i }));

        await waitFor(() => {
            expect(deleteNoteSpy).toHaveBeenCalledWith('1');
            expect(screen.queryByText('Test Note 1')).not.toBeInTheDocument();
        });

        deleteNoteSpy.mockRestore();
        viewListSpy.mockRestore();
    });

    // Test handling of error during note deletion
    it("should display error if note deletion fails", async () => {
        const viewListSpy = jest.spyOn(services, 'viewList').mockResolvedValue({
            status: 200,
            notes: [{ _id: '1', title: 'Test Note 1', content: 'Content 1' }]
        });
        const deleteNoteSpy = jest.spyOn(services, 'deleteNote').mockRejectedValue(new Error('Failed to delete note'));

        render(<DeleteNote />);

        await waitFor(() => {
            expect(screen.getByText('Test Note 1')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: /delete/i }));

        await waitFor(() => {
            expect(deleteNoteSpy).toHaveBeenCalledWith('1');
            expect(screen.getByText('Error deleting note')).toBeInTheDocument();
        });

        deleteNoteSpy.mockRestore();
        viewListSpy.mockRestore();
    });

    // Test rendering with no notes
    it("should display message if no notes are available", async () => {
        const viewListSpy = jest.spyOn(services, 'viewList').mockResolvedValue({
            status: 200,
            notes: []
        });

        render(<DeleteNote />);

        await waitFor(() => {
            expect(screen.getByText('No notes available')).toBeInTheDocument();
        });

        viewListSpy.mockRestore();
    });

    // Test rendering if note deletion response is not 200
    it("should handle non-200 status on deletion", async () => {
        const viewListSpy = jest.spyOn(services, 'viewList').mockResolvedValue({
            status: 200,
            notes: [{ _id: '1', title: 'Test Note 1', content: 'Content 1' }]
        });
        const deleteNoteSpy = jest.spyOn(services, 'deleteNote').mockResolvedValue({ status: 500 });

        render(<DeleteNote />);

        await waitFor(() => {
            expect(screen.getByText('Test Note 1')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: /delete/i }));

        await waitFor(() => {
            expect(deleteNoteSpy).toHaveBeenCalledWith('1');
            expect(screen.getByText('Failed to delete note')).toBeInTheDocument();
            expect(screen.getByText('Test Note 1')).toBeInTheDocument();
        });

        deleteNoteSpy.mockRestore();
        viewListSpy.mockRestore();
    });

    // Test rendering if fetch notes response is not 200
    it("should handle non-200 status on fetching notes", async () => {
        const viewListSpy = jest.spyOn(services, 'viewList').mockResolvedValue({ status: 500 });

        render(<DeleteNote />);

        await waitFor(() => {
            expect(screen.getByText('Failed to fetch notes')).toBeInTheDocument();
        });

        viewListSpy.mockRestore();
    });
});
