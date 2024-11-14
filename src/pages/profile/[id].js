import React, {useState,useEffect, use} from "react";
import { Container,Box,Typography,Button } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

const userProfile = ()=>{
    const router = useRouter();
    const {id} =router.query;
    const[profile,setProfile] = useState(null);
    const [loading,setLoading] =useState(true);

    useEffect(()=>{
        if(!id){
            return;
        }
        const fetchProfile = async()=>{
            try{
                const response = await axios.get(`http://localhost:3001/profile/${id}`);
                setProfile(response.data);
            }
            catch(error){
                console.error('Error fetching Profile',error);
            }
            finally{
                setLoading(false);
            }
        };
        fetchProfile();

    },[id]);

    if(loading){
        return<Typography>Loading...</Typography>
    }

    if(!profile){
        return <Typography>User Not Found</Typography>
    }

    return(
        <Container>
            <Box mt={4}>
                <Typography variant="h4">{profile.username}</Typography>
                <Typography variant="body1">{profile.bio}</Typography>
                {profile.avatar && (
                    <img
                        src={profile.avatar}
                        alt="User Avatar"
                        style={{width:'150px', height:'150px',borderRadiis:'56%'}}
                        />
                )}
            </Box>

            <Button 
                variant="contained"
                color="secondary"
                onClick={()=>handleAddFriend(profile._id)}
                style={{marginTop:'10px'}}
                >
                    Add Friend
                </Button>
        </Container>
    );
};

const handleAddFriend =  async(userId) =>{
    try{
        await axios.post(`http://localhost:3001/profile/${userId}/add-friend`);
        alert('friend added!');
    }
    catch (error){
        console.log('Error adding friend:',error);
    }
};

export default userProfile;


