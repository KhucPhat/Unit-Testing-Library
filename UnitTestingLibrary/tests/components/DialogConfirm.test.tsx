// File: DialogConfirm.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import DialogConfirm from '../../src/components/Dialog/DialogConfirm';

describe('DialogConfirm Component Tests', () => {
  const mockClose = vi.fn();
  const mockSubmitForm = vi.fn();

  const props = {
    openDialog: true,
    setOpenDialog: mockClose,
    formik: { submitForm: mockSubmitForm }
  };

  beforeEach(() => {
    render(<DialogConfirm {...props} />);
  });

  it('closes the dialog when "Cancel" is clicked', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockClose).toHaveBeenCalled();
  });

  it('calls submitForm when "Apply" is clicked', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /apply/i }));
    expect(mockSubmitForm).toHaveBeenCalled();
  });
});
