import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpdateList from '../components/UpdateList';
import * as services from '../utils/services';

jest.mock('../utils/services', () => ({
  viewList: jest.fn(),
  editNote: jest.fn(),
}));

describe("UpdateList Component", () => {

  it("should render the component correctly", () => {
    render(<UpdateList />);
    expect(screen.getByRole('heading', { name: /update notes/i })).toBeInTheDocument();
  });


});