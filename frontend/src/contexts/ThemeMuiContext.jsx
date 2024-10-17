'use client'
import { createContext, useState, useMemo, Suspense, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMediaQuery } from '@mui/material';

export const ThemeMuiContext = createContext();

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

export const ThemeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeMode, setThemeMode] = useState(prefersDarkMode ? 'dark' : 'light');
  const theme = useMemo(() => (themeMode === 'light' ? lightTheme : darkTheme), [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    setThemeMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  return (
    <ThemeMuiContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </MuiThemeProvider>
    </ThemeMuiContext.Provider>
  );
};