'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Paper,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  CheckCircle as ReadIcon,
  RadioButtonUnchecked as UnreadIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';
import { ProcessedWriteup } from '@/types/writeup';

interface WriteupTableProps {
  writeups: ProcessedWriteup[];
  onRowSelect: (writeup: ProcessedWriteup) => void;
  onToggleRead: (ids: string[]) => void;
}

export default function WriteupTable({
  writeups,
  onRowSelect,
  onToggleRead
}: WriteupTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selected, setSelected] = useState<string[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = writeups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((writeup) => writeup.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Utility function for category colors (keeping getCategoryIcon for future use)
  // const getCategoryIcon = (category: string) => {
  //   switch (category.toLowerCase()) {
  //     case 'web':
  //       return <Web fontSize="small" />;
  //     case 'pwn':
  //       return <Security fontSize="small" />;
  //     case 'crypto':
  //       return <Shield fontSize="small" />;
  //     case 'forensics':
  //       return <Computer fontSize="small" />;
  //     case 'reversing':
  //       return <BugReport fontSize="small" />;
  //     default:
  //       return <Star fontSize="small" />;
  //   }
  // };

  // Utility function for category colors (keeping for future use)
  // const getCategoryColor = (category: string) => {
  //   switch (category.toLowerCase()) {
  //     case 'web':
  //       return 'primary';
  //     case 'pwn':
  //       return 'error';
  //     case 'crypto':
  //       return 'warning';
  //     case 'forensics':
  //       return 'info';
  //     case 'reversing':
  //       return 'secondary';
  //     default:
  //       return 'default';
  //   }
  // };

  const paginatedWriteups = writeups.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (writeups.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No writeups found matching your criteria.
      </Alert>
    );
  }

  return (
    <Box>
      {selected.length > 0 && (
        <Paper
          elevation={3}
          sx={{ 
            mb: 3, 
            p: 3,
            borderRadius: 3,
            background: 'linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 100%)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            animation: 'slideInDown 0.3s ease-out'
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Checkbox checked sx={{ p: 0 }} />
              {selected.length} writeup{selected.length > 1 ? 's' : ''} selected
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<ReadIcon />}
                onClick={() => {
                  onToggleRead(selected);
                  setSelected([]);
                }}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  }
                }}
              >
                Mark as Read
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<UnreadIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                  }
                }}
                onClick={() => {
                  onToggleRead(selected);
                  setSelected([]);
                }}
              >
                Mark as Unread
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      <TableContainer 
        component={Paper} 
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid',
          borderColor: 'grey.200',
          '& .MuiTable-root': {
            borderCollapse: 'separate',
            borderSpacing: 0,
          }
        }}
      >
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                '& .MuiTableCell-head': {
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  borderBottom: 'none',
                  py: 2,
                }
              }}
            >
              <TableCell 
                padding="checkbox"
                sx={{
                  '& .MuiCheckbox-root': {
                    color: 'white !important',
                  }
                }}
              >
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < paginatedWriteups.length}
                  checked={paginatedWriteups.length > 0 && selected.length === paginatedWriteups.length}
                  onChange={handleSelectAllClick}
                  inputProps={{
                    'aria-label': 'select all writeups',
                  }}
                />
              </TableCell>
              <TableCell>📊 Status</TableCell>
              <TableCell>📝 Title</TableCell>
              <TableCell>👤 Author</TableCell>
              <TableCell>🏢 Programs</TableCell>
              <TableCell>💰 Bounty</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedWriteups.map((writeup) => {
              const isItemSelected = isSelected(writeup.id);
              return (
                <TableRow
                  hover
                  key={writeup.id}
                  selected={isItemSelected}
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.08)',
                      transform: 'scale(1.01)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(99, 102, 241, 0.12)',
                      '&:hover': {
                        backgroundColor: 'rgba(99, 102, 241, 0.16)',
                      },
                    },
                    '& .MuiTableCell-root': {
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      py: 2,
                    }
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onChange={() => handleClick(writeup.id)}
                      inputProps={{
                        'aria-labelledby': `enhanced-table-checkbox-${writeup.id}`,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={writeup.read ? <ReadIcon /> : <UnreadIcon />}
                      label={writeup.read ? '✅ Read' : '📖 Unread'}
                      color={writeup.read ? 'success' : 'warning'}
                      size="small"
                      variant={writeup.read ? 'filled' : 'outlined'}
                      sx={{
                        fontWeight: 600,
                        minWidth: '80px',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => onRowSelect(writeup)}
                  >
                    <Typography 
                      variant="subtitle2" 
                      color="primary" 
                      sx={{ 
                        cursor: 'pointer',
                        opacity: writeup.read ? 0.7 : 1,
                        fontWeight: writeup.read ? 'normal' : 'bold'
                      }}
                    >
                      {writeup.title}
                    </Typography>
                  </TableCell>
                  <TableCell>{writeup.authors}</TableCell>
                  <TableCell>{writeup.programs}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight={writeup.bounty !== 'No bounty' ? 'bold' : 'normal'}
                      color={writeup.bounty !== 'No bounty' ? 'success.main' : 'text.secondary'}
                    >
                      {writeup.bounty}
                    </Typography>
                  </TableCell>
                  <TableCell>{writeup.addedDate}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {writeup.Bugs.slice(0, 3).map((tag: string, index: number) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                      ))}
                      {writeup.Bugs.length > 3 && (
                        <Chip
                          label={`+${writeup.Bugs.length - 3}`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRowSelect(writeup);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      
                      {writeup.link && (
                        <Tooltip title="Open External Link">
                          <IconButton
                            size="small"
                            component={MuiLink}
                            href={writeup.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <OpenInNewIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      
                      <Tooltip title={writeup.read ? "Mark as Unread" : "Mark as Read"}>
                        <IconButton
                          size="small"
                          color={writeup.read ? "default" : "success"}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleRead([writeup.id]);
                          }}
                        >
                          {writeup.read ? <UnreadIcon /> : <ReadIcon />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper
        elevation={2}
        sx={{
          mt: 2,
          borderRadius: 2,
          background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={writeups.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '& .MuiTablePagination-toolbar': {
              px: 3,
              py: 2,
            },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontWeight: 500,
              color: 'text.primary',
            },
            '& .MuiIconButton-root': {
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
                transform: 'scale(1.1)',
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
}