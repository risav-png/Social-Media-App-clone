import React from 'react';
import MyForm from './form';
import { Box, Typography } from '@mui/material';

export default function LoginPage() {
    return (
        <div>
            <Box
                sx={{ 
                    textAlign: 'center',
                    mt: 2,
                    fontStyle: 'italic',
                    fontSize: 24, 
                }}
            >
                <Typography variant="h4">
                    Join Social App and Explore More..
                </Typography>
            </Box>

            <MyForm />
        </div>
    );
}
