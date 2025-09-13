'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Alert, CircularProgress, Typography, Paper } from '@mui/material';


import WriteupTable from '@/components/WriteupTable';
import WriteupDetailModal from '@/components/WriteupDetailModal';
import SearchAndFilter from '@/components/SearchAndFilter';
import Footer from '@/components/Footer';
import NoSSR from '@/components/NoSSR';
import StatCounter from '@/components/StatCounter';
import { ProcessedWriteup, FilterState } from '@/types/writeup';
import { processWriteups, filterWriteups } from '@/utils/dataUtils';

// Create a beautiful modern theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1', // Modern indigo
      light: '#818cf8',
      dark: '#4338ca',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899', // Modern pink
      light: '#f472b6',
      dark: '#be185d',
    },
    success: {
      main: '#10b981', // Modern emerald
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b', // Modern amber
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#ef4444', // Modern red
      light: '#f87171',
      dark: '#dc2626',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.04)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.08), 0px 2px 4px -1px rgba(0, 0, 0, 0.04)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.08), 0px 4px 6px -2px rgba(0, 0, 0, 0.04)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.08), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.20)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #4338ca 30%, #7c3aed 90%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.08), 0px 2px 4px -1px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.08), 0px 2px 4px -1px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.12), 0px 4px 6px -2px rgba(0, 0, 0, 0.08)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
  },
});

export default function Home() {
  const [writeups, setWriteups] = useState<ProcessedWriteup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWriteup, setSelectedWriteup] = useState<ProcessedWriteup | null>(null);

  const [filterState, setFilterState] = useState<FilterState>({
    search: '',
    selectedTags: [],
    selectedPrograms: [],
    selectedAuthors: [],
    readStatus: 'all',
    dateRange: { start: null, end: null },
  });

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Try API first, then fallback to local file
        try {
          const response = await fetch('/api/writeups');
          if (response.ok) {
            const data = await response.json();
            const processedData = processWriteups(data);
            setWriteups(processedData);
            return;
          }
        } catch (apiError) {
          console.log('API failed, trying local file:', apiError);
        }
        
        // Fallback to local file  
        const writeupData = await import('@/data/writeup.json');
        const processedData = processWriteups(writeupData.default ? writeupData.default : writeupData);
        setWriteups(processedData);
      } catch (err) {
        console.error('Error loading writeups:', err);
        setError('Failed to load writeups data. Please check that the writeup.json file exists.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle filter changes (keeping for future use)
  // const handleFilterChange = (newState: Partial<FilterState>) => {
  //   setFilterState(prev => ({ ...prev, ...newState }));
  // };

  // Handle writeup selection for detailed view
  const handleRowSelect = (writeup: ProcessedWriteup) => {
    setSelectedWriteup(writeup);
  };

  // Handle read status toggle
  const handleToggleRead = (ids: string[]) => {
    setWriteups(prev => 
      prev.map(writeup => 
        ids.includes(writeup.id) ? { ...writeup, read: !writeup.read } : writeup
      )
    );
  };

  // Get unique values for filters (keeping for future use)
  // const availableTags = useMemo(() => getUniqueValues(writeups, 'tags'), [writeups]);
  // const availablePrograms = useMemo(() => getUniqueValues(writeups, 'programs'), [writeups]);
  // const availableAuthors = useMemo(() => getUniqueValues(writeups, 'authors'), [writeups]);

  // Filter writeups based on current filter state
  const filteredWriteups = useMemo(() => 
    filterWriteups(
      writeups,
      filterState.search,
      filterState.selectedTags,
      filterState.selectedPrograms,
      filterState.selectedAuthors,
      filterState.readStatus,
      filterState.dateRange
    ), 
    [writeups, filterState]
  );

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Container maxWidth="sm">
            <Paper
              elevation={6}
              sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Box sx={{ mb: 3 }}>
                <CircularProgress 
                  size={80} 
                  thickness={4}
                  sx={{
                    color: 'primary.main',
                    animationDuration: '1.5s',
                  }}
                />
              </Box>
              <Typography 
                variant="h4" 
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                📚 Writeup Manager
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ fontSize: '1.1rem' }}
              >
                Loading your writeups with style...
              </Typography>
            </Paper>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Container>
          <Footer />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NoSSR fallback={
          <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
              }}
            >
              <CircularProgress 
                size={60} 
                thickness={4}
                sx={{ color: 'primary.main', mb: 2 }}
              />
              <Typography variant="h6" color="primary">
                ⚡ Initializing...
              </Typography>
            </Paper>
          </Box>
        }>
          {/* Beautiful Header Section */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              py: 6,
              mb: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              },
            }}
          >
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    background: 'linear-gradient(45deg, #ffffff 30%, #e0e7ff 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  📚 Writeup Manager
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.6,
                  }}
                >
                  Organize, track, and manage your cybersecurity writeups with style
                </Typography>
                <Box
                  sx={{
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    flexWrap: 'wrap',
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      px: 2,
                      py: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: 2,
                      color: 'white',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {writeups.length} Total Writeups
                    </Typography>
                  </Paper>
                  <StatCounter writeups={writeups} type="read" />
                  <StatCounter writeups={writeups} type="unread" />
                </Box>
              </Box>
            </Container>
          </Box>

          <Container maxWidth="xl" sx={{ py: 2, flex: 1 }}>
            <SearchAndFilter
              writeups={writeups}
              filters={filterState}
              onFiltersChange={setFilterState}
            />
            
            <WriteupTable
              writeups={filteredWriteups}
              onRowSelect={handleRowSelect}
              onToggleRead={handleToggleRead}
            />

            <WriteupDetailModal
              open={!!selectedWriteup}
              writeup={selectedWriteup}
              onClose={() => setSelectedWriteup(null)}
              onToggleRead={(id) => handleToggleRead([id])}
            />
          </Container>
          
          <Footer />
        </NoSSR>
      </Box>
    </ThemeProvider>
  );
}