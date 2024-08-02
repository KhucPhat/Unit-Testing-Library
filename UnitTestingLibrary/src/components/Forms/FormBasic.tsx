// MyForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Typography, Box } from '@mui/material';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
}

interface MyFormProps {
  onSubmit: (values: FormValues) => void;
}

const FormBasic: React.FC<MyFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: async (values: FormValues) => {
      await sleep(500);
      onSubmit(values);
    },
  });

  return (
    <Box sx={{ width: '300px', margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <form>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          margin="normal"
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          margin="normal"
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          margin="normal"
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => formik.submitForm()} // Gọi formik.submitForm() khi click
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default FormBasic;
