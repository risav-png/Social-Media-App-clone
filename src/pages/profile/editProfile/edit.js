import React, {useState,useEffect} from 'react';
import secureLocalStorage from 'react-secure-storage';
import { Container,Box,TextField,Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';


const EditProfile =()=> {
    const router =useRouter();
    const {id} = router.query;
    const [formData, setFormData] = useState({name:'',bio:'',avatar:''});
    const [loading, setLoading] = useState(true);
    const [friendId, setfriendId] = useState('');
  

    useEffect(()=>{
        if(!id){
            return;
        }

        const fetchProfileData = async()=>{
        const storedUser =secureLocalStorage.getItem('user');
        const user = JSON.parse(storedUser);

        try{
            const response = await fetch (`http://localhost:3001/profile/${id}`,{
                method:'GET',
                headers: {
                    'Content-type':'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },

            });
            if(response.ok){
                const profile = await response.json();
                setFormData({
                    name:profile.username || '',
                    bio:profile.bio || '',
                    avatar:profile.avatar || '',
                });
            }
        }
        catch(error){
            console.log('Failed to fetch Profile:',error);
        }
        finally{
            setLoading(false);
        }
    };
    
        fetchProfileData();
    
    },[id]);

    const handleChange =async(e) =>{
        const {name, value} = e.target;
        setFormData({...formData,[name]:value});
    };
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const storedUser =secureLocalStorage.getItem('user');
        const user = JSON.parse(storedUser);
        try {
            const response = await fetch(`http://localhost:3001/profile/${id}`,{
                method:'PUT',
                headers: {
                    'Content-type':'application/json',
                    'Authorization':`Bearer ${user.token}`,
                },
                body:JSON.stringify(formData),
            });
            
            if(response.ok){
                router.push('/profile');
            }

        }
        catch(error){
            console.error('failed to update Profile',error);
        }
    };



  return (
    <Container>
        <form onSubmit={handleSubmit}>
            <Box display={'flex'} flexDirection={'column'} gap={2} mt={4}>
                <TextField 
                    label = "Name"
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    />
                <TextField 
                    label='Bio'
                    name='bio'
                    value={formData.bio}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    />
                <TextField 
                    label ="Avatar URL"
                    name='avatar'
                    value={formData.avatar}
                    onChange={handleChange}
                    fullWidth
                 />
                 <Button 
                    type='submit'
                    variant="contained" 
                    color='primary'
                    sx={{ mt: 2 }} 
                    
                >
                    Save Changes
            </Button>

            <Typography variant='h5' gutterBottom style={{margin:'30px'}}>
                Add Friend
            </Typography>

            <TextField
                label='friend ID'
                value={friendId}
                onChange={(e)=>setfriendId(e.target.value)}
                fullWidth
                />

            <Button
                variant='contained'
                color='secondary'
                onClick={handleAddFriend}
                style={{marginTop:'10px'}}
                >
                Add Friend
            </Button>
            </Box>
        </form>
    </Container>
    
  );
};

export default EditProfile;
