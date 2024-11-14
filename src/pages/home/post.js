import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, CardMedia, IconButton, Button, TextField, Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Edit, Delete,ThumbUp,Comment } from '@mui/icons-material';
import secureLocalStorage from 'react-secure-storage';


export default function PostsPage({ posts, setPosts }) {
  const [posts1, setPosts1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [postToDelete,setPostToDelete] =useState(null);
  const [comments,setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likedPosts, setLikedPost] = useState([]);
  const user = JSON.parse(secureLocalStorage.getItem('user')) || {};
  const userId = user._id;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/post/user/${userId}`);
        setPosts1(response.data);
      } catch (err) {
        setError('Failed to fetch posts.',err.response?.data||err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, [userId]);

  const handleLike = async () =>{
    try{
      const isLiked =likedPost.includes(postId);
      if(isLiked){
        await axios.delete(`http://localhost:3001/post/${postId}/unlike`);
        setLikedPost(likedPost.filter(id=> id!==postId));
      }
      else{
        await axios.post(`http://localhost:3001/post/${postId}/like`);
        setLikedPost([...likedPost,postId]);
      }

    }
    catch(error){
      setError('failed to update like status',error.response?.data || error.message);
    }
  };
  
  const handleAddComment = async (postId) =>{
    try{
      const response = await axios.post(`http://localhost:3001/comments`,
        {
          postId,
          content:newComment,
          author:userId
        }
      );
      setComments({...CommentsDisabled,[postId]:[...(comments[postId] || []),response.data]});
      setNewComment('');
    }
    catch(err){
      setError('failed to add Comment',err.response?.data || err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/post/${postToDelete}`);
      setPosts1(posts1.filter(post => post._id !== postToDelete));
    } catch (err) {
      setError('Failed to delete post.',err.response?.data||err.message);
    } finally {
      setConfirmDeleteOpen(false);
      setPostToDelete(null);
    }
  };

  const handleEdit = (post) => {
    setEditPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditPost(null);
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:3001/post/${update._id}`, editPost);
      setPosts1(posts.map(post => post._id === editPost._id ? editPost : post));
      handleClose();
    } catch (err) {
      setError('Failed to update post.');
    }
  };

  const handleConfirmDelete = (postId) => {
    setPostToDelete(postId);
    setConfirmDeleteOpen(true);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteOpen(false);
    setPostToDelete(null);
  };

  if (loading) return <Typography variant="h6">Loading posts...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Grid container spacing={4}>
        {posts1.length > 0 ? (
          posts1.map((post) => (
            <Grid item xs={12} md={6} key={post._id}>
              <Card>
                {post.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:3001/uploads/${post.file}`}
                    alt="Post Image"
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {post.content}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Author: {post.author?.username || 'Unknown'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Created At: {new Date(post.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                  <Box>
                    <IconButton onClick={() => handleLike(post._id)}>
                      <ThumbUp color={likedPosts.includes(post._id) ? 'primary' : 'default'} />
                    </IconButton>
                    <Typography variant="body2">{post.likes?.length || 0} Likes</Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleEdit(post)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleConfirmDelete(post._id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2" gutterBottom>Comments:</Typography>
                  <Box>
                    {(comments[post._id] || []).map((comment, index) => (
                      <Typography key={index} variant="body2">
                        {comment.content}
                      </Typography>
                    ))}
                  </Box>
                  <TextField
                    label="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <Button variant="contained" color="primary" onClick={() => handleAddComment(post._id)}>
                    Comment
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No posts available.</Typography>
        )}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-post-modal"
        aria-describedby="edit-post-modal-description"
      >
        <Box sx={{ width: 400, p: 4, mx: 'auto', mt: '10%', bgcolor: 'background.paper', boxShadow: 24 }}>
          <Typography id="edit-post-modal" variant="h6" component="h2">
            Edit Post
          </Typography>
          <TextField
            label="Content"
            value={editPost?.content || ''}
            onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleUpdate} variant="contained" color="primary" fullWidth>
            Update Post
          </Button>
        </Box>
      </Modal>

      <Dialog
        open={confirmDeleteOpen}
        onClose={handleCancelDelete}
        aria-labelledby="confirm-delete-dialog"
        aria-describedby="confirm-delete-dialog-description"
      >
        <DialogTitle id="confirm-delete-dialog">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-dialog-description">
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
