// File: FormConfirm.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import FormConfirm from '../../src/components/Forms/FormConfirm';

// Mock useMutation hook
vi.mock('@tanstack/react-query', async () => {
    const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query');
    return {
      ...actual,
      useMutation: vi.fn(),
    };
  });

describe('FormConfirm Component Tests', () => {
  const setup = () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <FormConfirm />
      </QueryClientProvider>
    );
  };

  it('displays the confirmation dialog when the submit button is clicked', async () => {
    setup();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByText(/Are you sure you want to submit the form?/)).toBeInTheDocument();
  });
});
