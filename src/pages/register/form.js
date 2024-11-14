import React, { useState } from 'react';
import { TextField, Button, FormControl, Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';

function RegisterForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3001/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                setResponseMessage(result.message);
                router.push('/login');
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to register');
                setResponseMessage('');
            }
        } catch (error) {
            setError('An error occurred while registering: ' + error.message);
            setResponseMessage('');
        }
        setIsLoading(false);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 300,
                margin: 'auto',
                mt: 5,
            }}
        >
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <FormControl>
                        <TextField
                            label="Username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit">
                        Register Your Account
                    </Button>
                    {responseMessage && <p>{responseMessage}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
            )}
              <Box sx={{ textAlign: 'center', mt: 2 }}>
            <p> 

          Already have an account?{" "}
          <Link href="/login">
            Login here

          </Link>
        </p>
        </Box>
        </Box>
    );
}

export default RegisterForm;
