import { createTheme } from '@mui/material/styles';

// Common theme configuration for the app
export const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1', // Indigo
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899', // Pink
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

// Common style constants
export const commonStyles = {
  card: {
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:active': {
      transform: 'scale(0.98)',
    },
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
    marginTop: '1.5rem',
  },
  button: {
    flex: 1,
    padding: '12px',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none' as const,
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
};

