import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, List, ListItem, ListItemText, Box, CssBaseline, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import the theme
import Recipes from './Navigation Components/Recipes';
import Travel from './Navigation Components/Travel';
import Projects from './Navigation Components/Projects';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed" color="primary">
            <Toolbar>
              <Typography variant="h6" component="div">
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              </Typography>
            </Toolbar>
          </AppBar>
          <Box component="nav" sx={{ width: 240, flexShrink: 0 }}>
            <Paper sx={{ height: '100vh', paddingTop: 8 }}>
              <List>
                <ListItem button component={Link} to="/recipes">
                  <ListItemText primary="Recipes" />
                </ListItem>
                <ListItem button component={Link} to="/travel">
                  <ListItemText primary="Travel" />
                </ListItem>
                <ListItem button component={Link} to="/projects">
                  <ListItemText primary="Projects" />
                </ListItem>
              </List>
            </Paper>
          </Box>
          <Container component="main" sx={{ flexGrow: 1, p: 3, paddingTop: 10 }}>
            <Routes>
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/" element={
                <Box>
                  <Typography variant="h2">Welcome to My Life!</Typography>
                  <Typography variant="body1">Select a tab from the sidebar to view content.</Typography>
                </Box>
              } />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
