import { render, screen, fireEvent } from '@testing-library/react';
import Todolist from '../Todolist';

test('add and clear todo', () => {
    render(<Todolist />);

    const descriptionInput = screen.getByLabelText(/Description/i);
    const priorityInput = screen.getByLabelText(/Priority/i);
    const addButton = screen.getByText(/Add Todo/i);

    fireEvent.change(descriptionInput, { target: { value: 'Test Todo' } });
    fireEvent.change(priorityInput, { target: { value: 'High' } });
    fireEvent.click(addButton);

  // Verify the todo was added
    expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();

  // Clear all todos
    const clearButton = screen.getByText(/Clear Todos/i);
    fireEvent.click(clearButton);

  // Verify all todos were cleared
    expect(screen.queryByText(/Test Todo/i)).not.toBeInTheDocument();
});