'use client';

import React from 'react';
import {
  Box,
  Typography,
  Link,
  Container,
  Divider,
  IconButton,
  Chip,
  Tooltip
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Code as CodeIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Language as WebIcon,
  Favorite as HeartIcon,
  Build as BuildIcon
} from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(79, 70, 229, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(147, 51, 234, 0.2)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.5), transparent)',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3
          }}
        >
          {/* Developer Info Section */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center', 
              gap: 2,
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #9333ea, #4f46e5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <CodeIcon sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Crafted with <HeartIcon sx={{ fontSize: 16, color: '#ef4444', mx: 0.5, verticalAlign: 'middle' }} /> by
                </Typography>
                <Link
                  href="https://github.com/sajjadsiam"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #9333ea, #4f46e5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      filter: 'brightness(1.2)',
                    },
                  }}
                >
                  Sajjad Siam
                  <GitHubIcon 
                    sx={{ 
                      fontSize: 18, 
                      color: '#9333ea',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'rotate(360deg)',
                      }
                    }} 
                  />
                </Link>
              </Box>
            </Box>

            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="GitHub Profile" arrow>
                <IconButton
                  href="https://github.com/sajjadsiam"
                  target="_blank"
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(79, 70, 229, 0.1))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(147, 51, 234, 0.2)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(79, 70, 229, 0.2))',
                      transform: 'translateY(-2px) scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <GitHubIcon fontSize="small" sx={{ color: '#9333ea' }} />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Visit Portfolio - sajjadsiam.com" arrow>
                <IconButton
                  href="https://sajjadsiam.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(79, 70, 229, 0.1))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(147, 51, 234, 0.2)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(79, 70, 229, 0.2))',
                      transform: 'translateY(-2px) scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <WebIcon fontSize="small" sx={{ color: '#4f46e5' }} />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="LinkedIn" arrow>
                <IconButton
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(79, 70, 229, 0.1))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(147, 51, 234, 0.2)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(79, 70, 229, 0.2))',
                      transform: 'translateY(-2px) scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <LinkedInIcon fontSize="small" sx={{ color: '#6366f1' }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Divider 
            orientation="vertical" 
            flexItem 
            sx={{ 
              display: { xs: 'none', md: 'block' },
              borderColor: 'rgba(147, 51, 234, 0.2)',
              width: '1px'
            }} 
          />

          {/* Tech Stack & Copyright */}
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-end' },
              gap: 1,
              textAlign: { xs: 'center', md: 'right' }
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-end' } }}>
              <Chip
                icon={<BuildIcon />}
                label="Next.js 15"
                size="small"
                sx={{
                  background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(79, 70, 229, 0.1))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(147, 51, 234, 0.2)',
                  color: '#9333ea',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(79, 70, 229, 0.2))',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              />
              <Chip
                label="TypeScript"
                size="small"
                sx={{
                  background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(79, 70, 229, 0.1))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(147, 51, 234, 0.2)',
                  color: '#4f46e5',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(79, 70, 229, 0.2))',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              />
              <Chip
                label="Material-UI"
                size="small"
                sx={{
                  background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(79, 70, 229, 0.1))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(147, 51, 234, 0.2)',
                  color: '#6366f1',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(79, 70, 229, 0.2))',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              />
            </Box>
            
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                mt: 1,
                fontSize: '0.875rem',
                background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.7), rgba(79, 70, 229, 0.7))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'medium',
              }}
            >
              © {new Date().getFullYear()} Writeup Manager • Made with ❤️
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;