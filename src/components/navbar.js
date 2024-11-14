import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Home, Notifications, AccountCircle } from '@mui/icons-material';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import SearchBar from './searchbar';
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/router';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();
  
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget); 
    };

    const handleMenuClose = () => {
        setAnchorEl(null); 
    };

    const handleProfile = () => {
        router.push('/profile');
        handleMenuClose();
    };

    const handleLogOut = async () => {
        secureLocalStorage.removeItem('authtoken');
        secureLocalStorage.removeItem('user');
        handleMenuClose(); 
        router.push('/login');
    };

    const handleSelectUser = (user) => {
        router.push(`http://localhost:3000/profile/${user._id}`);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <SearchBar onSelectUser={handleSelectUser} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    SocialApp
                </Typography>
                <Link href={'/home'} passHref>
                    <IconButton color="inherit">
                        <Home />
                    </IconButton>
                </Link>
                <Link href={'/notification'} passHref>
                    <IconButton color="inherit">
                        <Notifications />
                    </IconButton>
                </Link>
                <IconButton
                    color="inherit"
                    onClick={handleMenuOpen}
                    aria-controls="profile-menu"
                    aria-haspopup="true"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
