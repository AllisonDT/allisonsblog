import React from 'react';
import { Typography, Grid, Link, Paper, Box, Chip } from '@mui/material';
import { styled } from '@mui/system';
import { StyledBox } from '../Custom Styles/commonstyles';
import { AppBlocking } from '@mui/icons-material';

const StyledListItem = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 200,
  marginBottom: theme.spacing(2),
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
  },
}));

const projects = [
  { 
    name: 'Flavor Fusion: Smart Spice Maker', 
    url: 'https://github.com/AllisonDT/Flavor-Fusion',
    description: 'A smart spice maker that stores, mixes, and dispenses spices using a mobile app.',
    image: '/images/flavor-fusion.png',
    techStack: ['Swift', 'Xcode'],
  },
  { 
    name: 'iPhone Music Practice App', 
    url: 'https://gitlab.com/musiccapstone/music-capstone', 
    description: 'An iPhone app to help musicians practice with a metronome, tuner, and recorder.',
    image: '/images/music-practice-app.png',
    techStack: ['Swift', 'Xcode'],
  },
  { 
    name: 'Virtual Reality Game', 
    url: '/page-unavailable',
    description: 'A VR game using Unity and the Oculus Integration SDK to run on the Oculus Quest.',
    image: '/images/vr-game.png',
    techStack: ['Unity', 'C#'],
  },
  { 
    name: "Allison's Life: A Personal Web App", 
    url: 'https://github.com/AllisonDT/allisonsblog',
    description: 'A personal web app built using Vite and React.',
    image: '/images/allisons-life.png',
    techStack: ['Vite', 'React'],
  },
];

const Projects: React.FC = () => {
  return (
    <StyledBox>
      <Typography variant="h2" align="center" gutterBottom>
        Projects
      </Typography>
      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <StyledListItem>
              <Typography variant="h6" align="center" gutterBottom>
                <Link href={project.url} target={project.url.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" underline="hover">
                  {project.name}
                </Link>
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                {project.description}
              </Typography>
              <Box>
                {project.techStack.map((tech, techIndex) => (
                  <Chip key={techIndex} label={tech} style={{ margin: '2px' }} />
                ))}
              </Box>
            </StyledListItem>
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  );
};

export default Projects;
