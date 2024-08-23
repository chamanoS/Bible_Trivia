import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Libre Baskerville, serif',
    h1: {
      fontFamily: 'Frank Ruhl Libre, serif',
    },
    h2: {
      fontFamily: 'Frank Ruhl Libre, serif',
    },
    // Add other typography variants as needed
  },
  palette: {
    primary: {
      main: '#3E2723', // Dark Brown
    },
    secondary: {
      main: '#795548', // Lighter Brown
    },
    background: {
      default: '#f5f5dc', // Beige/Parchment
    },
    text: {
      primary: '#3E2723',
      secondary: '#5D4037',
    },
  },
});

export default theme;
