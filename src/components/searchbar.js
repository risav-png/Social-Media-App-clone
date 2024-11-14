import { useState } from "react";
import axios from "axios";
import { Box, TextField, List, ListItem, ListItemAvatar, ListItemText, Avatar, CircularProgress, Typography, Paper, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSelectUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:3001/search/users`, { params: { query } });
      setSearchResult(response.data);
    } catch (error) {
      console.error('Error Searching for User:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%' }}>
      <TextField
        placeholder="Search User"
        variant="outlined"
        fullWidth
        size="small"
        value={searchQuery}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: loading ? <CircularProgress size={20} /> : null,
          sx: {
            backgroundColor: 'White',
            borderRadius: '20px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          },
        }}
      />
      {searchResult.length > 0 && (
        <Paper
          style={{
            position: 'absolute',
            top: '40px',
            width: '100%',
            maxHeight: '200px',
            overflow: 'auto',
            zIndex: 1000,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <List>
            {searchResult.map((user) => (
              <ListItem key={user._id} button onClick={() => onSelectUser(user)}>
                <ListItemAvatar>
                  <Avatar alt={user.username} src={user.profilePicture} />
                </ListItemAvatar>
                <ListItemText primary={user.username} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {searchResult.length === 0 && searchQuery.trim() !== '' && !loading && (
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
          No User Found
        </Typography>
      )}
    </Box>
  );
};

export default SearchBar;
