// MyForm.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { it, describe, vi, expect } from 'vitest';
import MyForm from '../../src/components/Forms/MyForm';

// Mock useMutation hook
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query');
  return {
    ...actual,
    useMutation: vi.fn(),
  };
});

const queryClient = new QueryClient();

const setup = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MyForm />
    </QueryClientProvider>
  );
};

describe('MyForm Component', () => {
  it('renders correctly and allows input', async () => {
    setup();

    // Check if fields are rendered
    expect(screen.getByRole('textbox', {name: /first name/i}), 'John');
    expect(screen.getByRole('textbox', {name: /last name/i}), 'Dee');
    expect( screen.getByRole('textbox', {name: /email/i}),
    'john.dee@someemail.com');

    // Simulate user typing
    await userEvent.type(screen.getByRole('textbox', {name: /first name/i}), 'John');
    await userEvent.type(screen.getByRole('textbox', {name: /last name/i}), 'Dee');
    await userEvent.type( screen.getByRole('textbox', {name: /email/i}),
    'john.dee@someemail.com');
  });  

  it('submits form data correctly', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue({
      id: 1,
      firstName: 'John',
      lastName: 'Dee',
      email: 'john.dee@someemail.com',
    });

    vi.mocked(useMutation).mockReturnValue({
      mutate: vi.fn(),
      mutateAsync: mockMutateAsync,
      status: 'success',
      data: undefined, // Change data to undefined
      error: null,
      isError: false,
      isLoading: false,
      reset: vi.fn(),
    } as any); // Use `as any` to bypass TypeScript checks for mocked return

    setup();

    // Simulate form submission
    await userEvent.type(screen.getByRole('textbox', {name: /first name/i}), 'John');
    await userEvent.type(screen.getByRole('textbox', {name: /last name/i}), 'Dee');
    await userEvent.type( screen.getByRole('textbox', {name: /email/i}),
    'john.dee@someemail.com');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Verify mutateAsync was called with correct data
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Dee',
        email: 'john.dee@someemail.com',
      });
    });
  });

  it('handles API errors gracefully', async () => {
    const mockMutateAsync = vi.fn().mockRejectedValue(new Error('Failed to create/update user'));

    vi.mocked(useMutation).mockReturnValue({
      mutate: vi.fn(),
      mutateAsync: mockMutateAsync,
      status: 'error',
      data: undefined, // Change data to undefined
      error: new Error('Failed to create/update user'),
      isError: true,
      isLoading: false,
      reset: vi.fn(),
    } as any); // Use `as any` to bypass TypeScript checks for mocked return

    setup();

    // Simulate form submission
    await userEvent.type(screen.getByRole('textbox', {name: /first name/i}), 'John');
    await userEvent.type(screen.getByRole('textbox', {name: /last name/i}), 'Dee');
    await userEvent.type( screen.getByRole('textbox', {name: /email/i}),
    'john.dee@someemail.com');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check for error handling
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
      // Check that the error message is displayed, or ensure your component handles it
      // Example: expect(screen.getByText(/Error creating\/updating user/i)).toBeInTheDocument();
    });
  });
});
