import React, { useEffect, useState } from 'react';
import { Typography, Avatar, Paper, Box, TextField, Button } from '@mui/material';
import { StyledBox, BiographyContainer, AvatarBox } from '../Custom Styles/commonstyles';
import axios from 'axios';

interface AboutMeData {
  name: string;
  biography: string;
  avatarUrl: string;
}

const Home: React.FC = () => {
  const [aboutMe, setAboutMe] = useState<AboutMeData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<AboutMeData>({ name: '', biography: '', avatarUrl: '' });

  const fetchAboutMe = async () => {
    try {
      const response = await axios.get('/api/aboutme');
      if (response.data) {
        setAboutMe(response.data);
        setFormData(response.data);
      }
    } catch (error) {
      console.error('Error fetching about me data:', error);
    }
  };

  useEffect(() => {
    fetchAboutMe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('/api/aboutme', formData);
      setAboutMe(response.data);
      setIsEditing(false);
      fetchAboutMe();  // Fetch the updated data
    } catch (error) {
      console.error('Error updating about me data:', error);
    }
  };

  if (!aboutMe) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <StyledBox>
      <Typography variant="h2" align="center" gutterBottom>
        Welcome to My Life!
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <BiographyContainer>
          <Box>
            <Typography variant="h4" gutterBottom>
              About Me
            </Typography>
            {isEditing ? (
              <Box>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Biography"
                  name="biography"
                  value={formData.biography}
                  onChange={handleInputChange}
                  margin="normal"
                  multiline
                  rows={4}
                />
                <TextField
                  fullWidth
                  label="Avatar URL"
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
                  Save
                </Button>
              </Box>
            ) : (
              <Box>
                {/* <Typography variant="h5" gutterBottom>
                  {aboutMe.name}
                </Typography> */}
                <Typography>
                  {aboutMe.biography}
                </Typography>
              </Box>
            )}
          </Box>
          <AvatarBox sx={{ flexShrink: 0 }}>
            <Avatar
              alt={aboutMe.name}
              src={aboutMe.avatarUrl}
              sx={{ width: 200, height: 200 }}
            />
          </AvatarBox>
        </BiographyContainer>
        {!isEditing && (
          <Button variant="outlined" color="primary" onClick={() => setIsEditing(true)} sx={{ mt: 2 }}>
            Edit
          </Button>
        )}
      </Paper>
    </StyledBox>
  );
};

export default Home;
