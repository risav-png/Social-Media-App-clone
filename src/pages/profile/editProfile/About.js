import React, {useState,useEffect} from 'react'
import { Container,Box,TextField,Button, Typography } from '@mui/material'

const About = ({profileData, onSave, onCancel}) => {
   const [work, setWork] = useState(profileData?.work || '');
   const [education, setEducation] = useState(profileData?.education || '');
   const [location, setLocation] = useState(profileData?.location||'');
   const [relationshipStatus, setRelationshipStatus] = useState(profileData?.relationshipStatus || '');


   const handleSave = () => {
    const updateProfile = {work, education,location,relationshipStatus};
    onSave(updateProfile);

   };

   return (
    <Box>
        <Typography variant='h6' gutterBottom>Edit About</Typography>

        <TextField
            fullWidth
            label='Work'
            value={work}
            onChange={(e)=> setEducation(e.target.value)}
            sx={{mb: 2}}
        />

        <TextField
            fullWidth
            label='location'
            value={location}
            onChange={(e)=> setLocation(e.target.value)}
            sx={{mb:2}}
        />

        <TextField 
            fullWidth
            label='Education'
            value={education}
            onChange={(e)=> setEducation(e.target.value)}
            sx={{mb:2}}    
         />

        <TextField
            fullWidth
            label='Relationship Status'
            value={relationshipStatus}
            onChange={(e)=>setRelationshipStatus(e.target.value)}
            sx={{mb:2}}
         />

         <Box mt={2}>
            <Button variant='contained' color='primary' onClick={handleSave} sx={{mr:2}}>
                Save
            </Button>
            <Button variant='outlined' onClick={oncancel}>
                Cancel
            </Button>
            </Box>    


    </Box>
   );
};

export default About;