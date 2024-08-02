import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
}


const MyForm: React.FC = () => {
    // Sử dụng useMutation để xử lý thao tác cập nhật/tạo mới

   // Hàm giả lập gọi API tạo hoặc cập nhật
const createOrUpdateUser = async (values: FormValues) => {
    console.log('API request to create/update user:', values);
    // Giả lập thời gian chờ của API
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Giả sử trả về đối tượng đã được cập nhật hoặc tạo mới
    return { id: 1, ...values };
}; const handleCreateUpDate = useMutation({
        mutationFn: createOrUpdateUser,
        onSuccess: (data) => {
            // Xử lý sau khi mutation thành công
            console.log('User created/updated successfully:', data);
        },
        onError: (error) => {
            // Xử lý khi mutation thất bại
            console.error('Error creating/updating user:', error);
        }
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: (values) => {
            // Gọi mutation để tạo hoặc cập nhật dữ liệu
            handleCreateUpDate.mutateAsync(values);
        },
    });

    return (
        <Box sx={{ width: '300px', margin: '0 auto' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Sign Up
            </Typography>
            <form onSubmit={formik.handleSubmit}>
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
                    onClick={() => {
                        formik.submitForm();
                    }}
                    sx={{ mt: 2 }}
                >
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default MyForm;