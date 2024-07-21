import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, List, ListItem, ListItemText, Box, CssBaseline, Paper, IconButton, Divider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Home as HomeIcon, RestaurantMenu as RecipesIcon, TravelExplore as TravelIcon, Build as ProjectsIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Description as ResumeIcon } from '@mui/icons-material';
import theme from './theme';
import Recipes from './Navigation Components/Recipes';
import Travel from './Navigation Components/Travel';
import Projects from './Navigation Components/Projects';
import Home from './Navigation Components/Home';
import Resume from './Navigation Components/Resume';

function App() {
  const [open, setOpen] = useState(true);

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed" color="primary">
            <Toolbar>
              <Typography variant="h6" component="div">
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <HomeIcon sx={{ mr: 1 }} />
                  {open && 'Home'}
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
          <Box component="nav" sx={{ width: open ? 240 : 60, flexShrink: 0, transition: 'width 0.3s' }}>
            <Paper sx={{ height: '100vh', paddingTop: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
              <List>
                <ListItem button component={Link} to="/recipes">
                  <RecipesIcon />
                  {open && <ListItemText primary="Recipes" sx={{ ml: 1 }} />}
                </ListItem>
                <ListItem button component={Link} to="/travel">
                  <TravelIcon />
                  {open && <ListItemText primary="Travel" sx={{ ml: 1 }} />}
                </ListItem>
                <ListItem button component={Link} to="/projects">
                  <ProjectsIcon />
                  {open && <ListItemText primary="Projects" sx={{ ml: 1 }} />}
                </ListItem>
                <ListItem button component={Link} to="/resume">
                  <ResumeIcon />
                  {open && <ListItemText primary="Resume" sx={{ ml: 1 }} />}
                </ListItem>
              </List>
              <Divider />
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                right: open ? 0 : 'auto',
                bottom: 0,
                transform: open ? 'translateX(10%)' : 'none',
                transition: 'transform 0.3s',
                p: 1
              }}>
                <IconButton onClick={handleToggleSidebar}>
                  {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </Box>
            </Paper>
          </Box>
          <Container component="main" sx={{ flexGrow: 1, p: 3, paddingTop: 10 }}>
            <Routes>
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
