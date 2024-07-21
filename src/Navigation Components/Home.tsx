// Home.tsx
import React from 'react';
import { Typography, Avatar, Paper, Box } from '@mui/material';
import { StyledBox, BiographyContainer, AvatarBox } from '../Custom Styles/commonstyles';

const Home: React.FC = () => {
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
            <Typography variant="body1" paragraph>
              Hi, I'm Allison Turner. I love exploring new places, going to Disney World, baking, and cooking. In my professional life, I'm a dedicated software developer
              working on innovative projects that push the boundaries of technology.
            </Typography>
          </Box>
          <AvatarBox>
            <Avatar
              alt="Allison Turner"
              src="/headshot.jpg"
              sx={{ width: 200, height: 200 }}
            />
          </AvatarBox>
        </BiographyContainer>
      </Paper>
    </StyledBox>
  );
};

export default Home;
