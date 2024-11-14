import { AppBar, Toolbar, Typography, Container, Grid, Box, Card, CardContent, IconButton, Avatar, TextField, CardActions, Button, Menu, MenuItem } from '@mui/material';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPost, createPost, likePost, deletePost } from "../redux/action";
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from "next/router";
import Link from 'next/link';
import PostsPage from './post';
import Navbar from '@/components/navbar';

export default function HomePag() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts || []);
  const error = useSelector((state) => state.error);
  const router = useRouter();
  const user = JSON.parse(secureLocalStorage.getItem('user')) || {};
  const [loading, setLoading] = useState(true);
  const [anchorE1, setAnchorE1] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const open = Boolean(anchorE1);

  useEffect(() => {
    if (!user._id) {
      router.push('/login');
      return;
    }
    dispatch(getPost());
    setLoading(false);
  }, [dispatch, router, user._id]);

 
  

  const handleCreatePost = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('author', user._id);
  
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
  
    try {
     
  
      const response = await dispatch(createPost(formData));
      
      
      
      if(response.status ==='success'){
        const newPost= response.data;
        setPosts([newPost, ...posts]);
      } else{
        console.error('failed to create Post',error);
      }
      
   
     
    } catch (error) {
     
      console.error('Failed to create post in Frontend:', error);
    }
  };
  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

 
  

  if (loading) return <Typography variant="body1">Loading...</Typography>;

  return (
    <div>
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Card>
                <Link href={'/profile'} passHref>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Profile
                    </Typography>
                    <Avatar sx={{ width: 56, height: 56, mb: 2 }}>
                      {user.username ? user.username[0] : 'U'}
                    </Avatar>
                    <Typography variant="body1">{user.username || 'Loading...'}</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            {error && <Typography color="error">{error}</Typography>}

            <form onSubmit={handleCreatePost}>
              <TextField
                label="Write Something"
                name="content"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                multiline
                rows={4}
              />
              <input
                type='file'
                name='file'
                accept='image/*'
                style={{ margin: '10px 0' }}
                onChange={handleFileChange}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Post
              </Button>
            </form>

          
          </Grid>

          <Grid item xs={12} md={3}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Suggestions
                  </Typography>
                  <Typography variant="body2">Suggested User 1</Typography>
                  <Typography variant="body2">Suggested User 2</Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <PostsPage />
    </div> 
  );
}
