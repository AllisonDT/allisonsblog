import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  List,
  ListItemText,
  Box,
  CssBaseline,
  Paper,
  IconButton,
  Divider,
  BottomNavigation,
  BottomNavigationAction,
  ListItemButton,
} from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {
  Home as HomeIcon,
  RestaurantMenu as RecipesIcon,
  TravelExplore as TravelIcon,
  Build as ProjectsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Description as ResumeIcon,
} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from './theme';
import Recipes from './Navigation Components/Recipes';
import Travel from './Navigation Components/Travel';
import Projects from './Navigation Components/Projects';
import Home from './Navigation Components/Home';
import Resume from './Navigation Components/Resume';
import PageUnavailable from './Navigation Components/PageUnavailable';

const compactNavStyle = {
  '& .MuiBottomNavigationAction-root': {
    minWidth: 0,
    maxWidth: 'auto',
    padding: '6px 12px',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
  },
  '& .MuiBottomNavigationAction-label': {
    fontSize: '0.75rem',
    '&.Mui-selected': {
      fontSize: '0.75rem',
    },
  },
};

function App() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}
        >
          <AppBar position="fixed" color="primary">
            <Toolbar>
              <Typography variant="h6" component="div">
                <Link
                  to="/allisonsblog"
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <HomeIcon sx={{ mr: 1 }} />
                  {!isMobile && 'Home'}
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
          {!isMobile && (
            <Box
              component="nav"
              sx={{
                width: open ? 240 : 60,
                flexShrink: 0,
                transition: 'width 0.3s',
              }}
            >
              <Paper
                sx={{
                  height: '100vh',
                  paddingTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <List>
                  <ListItemButton component={Link} to="/recipes">
                    <RecipesIcon />
                    {open && <ListItemText primary="Recipes" sx={{ ml: 1 }} />}
                  </ListItemButton>
                  {/* <ListItemButton component={Link} to="/travel">
                    <TravelIcon />
                    {open && <ListItemText primary="Travel" sx={{ ml: 1 }} />}
                  </ListItemButton> */}
                  <ListItemButton component={Link} to="/projects">
                    <ProjectsIcon />
                    {open && <ListItemText primary="Projects" sx={{ ml: 1 }} />}
                  </ListItemButton>
                  <ListItemButton component={Link} to="/resume">
                    <ResumeIcon />
                    {open && <ListItemText primary="Resume" sx={{ ml: 1 }} />}
                  </ListItemButton>
                </List>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    right: open ? 0 : 'auto',
                    bottom: 0,
                    transform: open ? 'translateX(10%)' : 'none',
                    transition: 'transform 0.3s',
                    p: 1,
                  }}
                >
                  <IconButton onClick={handleToggleSidebar}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </Box>
              </Paper>
            </Box>
          )}
          <Container
            component="main"
            sx={{ flexGrow: 1, p: 3, paddingTop: 10 }}
          >
            <Routes>
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/allisonsblog" element={<Home />} />
              <Route path="*" element={<PageUnavailable />} />
            </Routes>
          </Container>
          {isMobile && (
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              showLabels
              sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                ...compactNavStyle,
              }}
            >
              <BottomNavigationAction
                component={Link}
                to="/allisonsblog"
                label="Home"
                icon={<HomeIcon />}
              />
              <BottomNavigationAction
                component={Link}
                to="/recipes"
                label="Recipes"
                icon={<RecipesIcon />}
              />
              <BottomNavigationAction
                component={Link}
                to="/travel"
                label="Travel"
                icon={<TravelIcon />}
              />
              <BottomNavigationAction
                component={Link}
                to="/projects"
                label="Projects"
                icon={<ProjectsIcon />}
              />
              <BottomNavigationAction
                component={Link}
                to="/resume"
                label="Resume"
                icon={<ResumeIcon />}
              />
            </BottomNavigation>
          )}
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
