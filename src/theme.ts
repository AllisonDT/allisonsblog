import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      marginBottom: '20px',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
});

export default theme;
