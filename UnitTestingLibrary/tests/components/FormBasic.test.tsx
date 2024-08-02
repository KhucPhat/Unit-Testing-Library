import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, expect, describe, vi } from 'vitest';
import FormBasic from '../../src/components/Forms/FormBasic';

describe('FormBasic Component', () => {
  it('should render and submit a basic Formik form', async () => {
    const handleSubmit = vi.fn();
    render(<FormBasic onSubmit={handleSubmit} />);
    const user = userEvent.setup();

    await user.type(screen.getByRole('textbox', { name: /first name/i }), 'John');
    await user.type(screen.getByRole('textbox', { name: /last name/i }), 'Dee');
    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      'john.dee@someemail.com'
    );

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'john.dee@someemail.com',
        firstName: 'John',
        lastName: 'Dee',
      })
    );
  });
});
