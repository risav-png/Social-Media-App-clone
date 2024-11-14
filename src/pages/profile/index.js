import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { Container, Avatar, Typography, Button, Box, CircularProgress,CardMedia, Grid, Paper, Card, Tabs, Menu, MenuItem, Tab, CardContent} from '@mui/material';
import Navbar from '@/components/navbar';
import { useRouter } from 'next/router';
import axios from 'axios';


const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorE1] =useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = secureLocalStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      fetchProfile(user._id, user.token);
    }
  }, []);

  const fetchProfile = async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:3001/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setProfileData(result);
      } else {
        throw new Error('Failed to fetch profile data');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleProfilePictureUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setUploading(true);
      setUploadError(null);
      const storedUser = secureLocalStorage.getItem('user');
      const user = JSON.parse(storedUser);

      const response = await fetch(`http://localhost:3001/profile/${user._id}/uploads`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfileData(updatedProfile);
        setSelectedFile(null);
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to upload profile picture: ${errorText}`);
      }
    } catch (error) {
      console.error(error);
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEditClick = () => {
    
    console.log('Edit profile clicked');
    router.push('/editProfile');
  };

  const handleProfilePictureDelete = async () => {
    try{
      const storedUser = secureLocalStorage.getItem('user');
      const user =JSON.parse(storedUser);

      const response = await fetch(`http://localhost:3001/profile/${user._id}/deleteProfilePicture`,{
        method:'DELETE',
        headers:{
          Authorization:`Bearer ${user.token}`
        },
      });
      if(response.ok){
        const updatedProfile = await response.json();
        setProfileData(updatedProfile);
      }
      else{
        const errorTxt =await response.text();
        throw new Error( `Failed to Delete Profile Picture:${errortxt}`);
      }
    }
    catch(error){
      console.error(error);
    
    }
  };

  const handleMenuClick =(event) =>{
    setAnchorE1(event.currentTarget);
  };

  const handleMenuClose = () =>{
    setAnchorE1(null);;
  };

  const handleTabChange = (event, newValue) =>{
    setActiveTab(newValue);
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : (
          profileData && (
            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
              <Box sx={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden', mb: 5 }}>
                <CardMedia
                  component="img"
                  image={`http://localhost:3001/${profileData.coverPhoto}`}
                  alt="Cover photo"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Avatar
                  src={`http://localhost:3001/${profileData.profilePicture}`}
                  sx={{
                    width: 150,
                    height: 150,
                    position: 'absolute',
                    bottom: -75,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    border: '3px solid white',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </Box>

              <Button variant="contained" onClick={handleMenuClick} sx={{ mt: 2 }}>
                Manage Profile Picture
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem>
                  <label htmlFor="upload-avatar" style={{ cursor: 'pointer', width: '100%' }}>
                    Change Profile Picture
                  </label>
                  <input
                    type="file"
                    id="upload-avatar"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </MenuItem>
                <MenuItem onClick={handleProfilePictureDelete}>Delete Profile Picture</MenuItem>
              </Menu>

              {selectedFile && (
                <Box mt={2}>
                  <Typography>Selected file: {selectedFile.name}</Typography>
                </Box>
              )}

              <Button
                variant="contained"
                onClick={handleProfilePictureUpload}
                sx={{ mt: 2 }}
                disabled={uploading || !selectedFile}
              >
                {uploading ? 'Uploading...' : 'Upload Profile Picture'}
              </Button>

              {uploadError && (
                <Typography color="error" mt={2}>
                  {uploadError}
                </Typography>
              )}

              <Typography variant="h4" mt={4}>
                {profileData.username}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {profileData.bio}
              </Typography>
              <Button variant="contained" sx={{ mt: 2 }} onClick={() => router.push('/editProfile')}>
                Edit Profile
              </Button>

              {/* Tabs Section */}
              <Box sx={{ width: '100%', mt: 4 }}>
                <Tabs value={activeTab} onChange={handleTabChange} centered>
                  <Tab label="Posts" />
                  <Tab label="Friends" />
                  <Tab label="Photos" />
                  <Tab label="About" />
                </Tabs>

                {activeTab === 0 && (
                  <Box mt={2}>
                    <Typography variant="h6">User Posts</Typography>
                    {profileData.posts && profileData.posts.length > 0 ? (
                      profileData.posts.map((post) => (
                        <Card key={post._id} sx={{ mt: 2 }}>
                          <CardContent>
                            <Typography variant="body1">{post.content}</Typography>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Typography>No posts available</Typography>
                    )}
                  </Box>
                )}

                {activeTab === 1 && (
                  <Box mt={2}>
                    <Typography variant="h6">Friends</Typography>
                    <Grid container spacing={2}>
                      {profileData.friends && profileData.friends.length > 0 ? (
                        profileData.friends.map((friend) => (
                          <Grid item key={friend._id} xs={3}>
                            <Card>
                              <CardContent>
                                <Avatar src={friend.avatar} />
                                <Typography>{friend.name}</Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))
                      ) : (
                        <Typography>No friends available</Typography>
                      )}
                    </Grid>
                  </Box>
                )}

                {activeTab === 2 && (
                  <Box mt={2}>
                    <Typography variant="h6">Photos</Typography>
                    <Grid container spacing={2}>
                      {profileData.photos && profileData.photos.length > 0 ? (
                        profileData.photos.map((photo) => (
                          <Grid item key={photo._id} xs={3}>
                            <Card>
                              <CardMedia component="img" image={photo.url} alt="User photo" />
                            </Card>
                          </Grid>
                        ))
                      ) : (
                        <Typography>No photos available</Typography>
                      )}
                    </Grid>
                  </Box>
                )}

                {activeTab === 3 && (
                  <Box mt={2}>
                    <Typography variant="h6">About</Typography>
                    <Typography>{profileData.about}</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )
        )}
      </Container>
    </div>
  );
};

export default Profile;