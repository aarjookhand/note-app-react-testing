import React from 'react';
import '@testing-library/jest-dom'; 
import { render, screen } from '@testing-library/react';
import App from '../App';



test('basically just the notepage rendered', async() => {
    render(<App/>);
    expect(screen.getByTestId('note-page-div')).toBeInTheDocument();
})