import React, { useState,useEffect } from 'react';
import { TextField, Button, FormControl, Box } from '@mui/material';
import { useRouter } from 'next/router';
import secureLocalStorage from 'react-secure-storage';
import Link from 'next/link';
import HomePage from '../home';


function MyForm() {
    const [formData, setFormData] = useState({
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
            const response = await fetch('http://localhost:3001/user/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setResponseMessage(result.message);
                secureLocalStorage.setItem('user', JSON.stringify(result.user));
                router.push('/home');
                setError('');
            } else {
                setError(errorData.message || 'Failed to login');
                setResponseMessage('');
            }
        } catch (error) {
            setError('An error occurred: ' + error.message);
            setResponseMessage('');
        }
        setIsLoading(false);
    };

    useEffect(() => {
      
    }, []);
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
            <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Logging In...' : 'Log-In'}
            </Button>
            {responseMessage && <p>{responseMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Box sx={{ textAlign: 'center', mt: 2 }}>
            <p> 

          Don't have an account?{" "}
          <Link href="/register">
            Register here

          </Link>
        </p>
        </Box>
        </Box>
    );
}

export default MyForm;
