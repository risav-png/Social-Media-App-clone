import React, { Component } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from './themes';

const Layout =({children})=>{
    return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container maxWidth="lg">
            {children}
        </Container>
    </ThemeProvider>
    )
}
export default Layout;