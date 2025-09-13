'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Link as MuiLink,
  IconButton,
  Paper
} from '@mui/material';
import {
  Close as CloseIcon,
  OpenInNew as OpenInNewIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  BugReport as BugIcon,
  Business as BusinessIcon,
  MonetizationOn as MoneyIcon,
  CheckCircle as ReadIcon,
  RadioButtonUnchecked as UnreadIcon
} from '@mui/icons-material';
import { ProcessedWriteup } from '@/types/writeup';

interface WriteupDetailModalProps {
  open: boolean;
  writeup: ProcessedWriteup | null;
  onClose: () => void;
  onToggleRead?: (id: string) => void;
}

export default function WriteupDetailModal({
  open,
  writeup,
  onClose,
  onToggleRead
}: WriteupDetailModalProps) {
  if (!writeup) return null;

  const handleToggleRead = () => {
    if (onToggleRead && writeup.id) {
      onToggleRead(writeup.id);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { 
          minHeight: '70vh', 
          maxHeight: '95vh',
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid',
          borderColor: 'grey.200',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        }
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
        }
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: 'white',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #ec4899, #f59e0b, #10b981, #3b82f6)',
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1, mr: 2 }}>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{
                fontWeight: 700,
                lineHeight: 1.3,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              📚 {writeup.title}
            </Typography>
            <Chip 
              label={writeup.read ? "✅ READ" : "📖 UNREAD"} 
              color={writeup.read ? "success" : "warning"} 
              size="medium" 
              sx={{ 
                mb: 1,
                fontWeight: 600,
                backgroundColor: writeup.read ? 'rgba(255, 255, 255, 0.2)' : 'rgba(251, 191, 36, 0.8)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            />
          </Box>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ 
              mt: -1, 
              mr: -1,
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'rotate(90deg) scale(1.1)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent 
        dividers
        sx={{
          background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
          borderColor: 'rgba(99, 102, 241, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Enhanced Main Info Section */}
          <Box>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3, 
                borderRadius: 3,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 3,
                p: 2,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #3b82f6 30%, #6366f1 90%)',
                color: 'white',
              }}>
                <OpenInNewIcon sx={{ fontSize: '1.5rem' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  🔗 Article Link
                </Typography>
              </Box>
              {writeup.link ? (
                <MuiLink
                  href={writeup.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  <Typography variant="body1">
                    Open Original Article
                  </Typography>
                  <OpenInNewIcon fontSize="small" />
                </MuiLink>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No link available
                </Typography>
              )}
            </Paper>
          </Box>

          {/* Authors and Programs Section */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PersonIcon color="primary" />
                <Typography variant="h6">Authors</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {writeup.Authors.map((author, index) => (
                  <Chip
                    key={index}
                    label={author}
                    variant="outlined"
                    color="primary"
                    icon={<PersonIcon />}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <BusinessIcon color="primary" />
                <Typography variant="h6">Programs</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {writeup.Programs.map((program, index) => (
                  <Chip
                    key={index}
                    label={program}
                    variant="outlined"
                    color="secondary"
                    icon={<BusinessIcon />}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          {/* Vulnerability Tags Section */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <BugIcon color="primary" />
              <Typography variant="h6">Vulnerability Types</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {writeup.Bugs.map((bug, index) => (
                <Chip
                  key={index}
                  label={bug}
                  color="warning"
                  icon={<BugIcon />}
                />
              ))}
            </Box>
          </Box>

          {/* Bounty and Dates Section */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 1, maxWidth: { md: '300px' } }}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'success.contrastText' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <MoneyIcon />
                  <Typography variant="h6">Bounty Reward</Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold">
                  {writeup.bounty}
                </Typography>
              </Paper>
            </Box>

            <Box sx={{ flex: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                    <CalendarIcon color="primary" />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Publication Date
                    </Typography>
                  </Box>
                  <Typography variant="h6">
                    {writeup.PublicationDate}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                    <CalendarIcon color="secondary" />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Added Date
                    </Typography>
                  </Box>
                  <Typography variant="h6">
                    {writeup.AddedDate}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions 
        sx={{ 
          p: 3, 
          gap: 2,
          background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
          borderTop: '1px solid rgba(99, 102, 241, 0.1)',
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          ❌ Close
        </Button>
        {writeup.link && (
          <Button
            href={writeup.link}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            startIcon={<OpenInNewIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              background: 'linear-gradient(45deg, #3b82f6 30%, #6366f1 90%)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                background: 'linear-gradient(45deg, #2563eb 30%, #4338ca 90%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
              }
            }}
          >
            🔗 Open Article
          </Button>
        )}
        {onToggleRead && (
          <Button
            onClick={handleToggleRead}
            variant="contained"
            color={writeup.read ? "warning" : "success"}
            startIcon={writeup.read ? <UnreadIcon /> : <ReadIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px) scale(1.05)',
                boxShadow: writeup.read 
                  ? '0 8px 20px rgba(251, 146, 60, 0.4)' 
                  : '0 8px 20px rgba(16, 185, 129, 0.4)',
              }
            }}
          >
            {writeup.read ? '📖 Mark as Unread' : '✅ Mark as Read'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}