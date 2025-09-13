'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Autocomplete,
  Chip,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Badge,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  Search as SearchIcon,
  CheckCircle as ReadIcon,
  RadioButtonUnchecked as UnreadIcon,
  List as AllIcon
} from '@mui/icons-material';
import { ProcessedWriteup, FilterState } from '@/types/writeup';

interface SearchAndFilterProps {
  writeups: ProcessedWriteup[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function SearchAndFilter({
  writeups,
  filters,
  onFiltersChange
}: SearchAndFilterProps) {
  const [expanded, setExpanded] = useState(false);

  // Extract unique values from writeups for filter options
  const filterOptions = useMemo(() => {
    const tags = new Set<string>();
    const programs = new Set<string>();
    const authors = new Set<string>();
    const bounties = new Set<string>();

    writeups.forEach(writeup => {
      // Add tags/bugs
      if (writeup.Bugs && Array.isArray(writeup.Bugs)) {
        writeup.Bugs.forEach(bug => tags.add(bug));
      }
      
      // Add programs
      if (writeup.Programs && Array.isArray(writeup.Programs)) {
        writeup.Programs.forEach(program => programs.add(program));
      }
      
      // Add authors
      if (writeup.Authors && Array.isArray(writeup.Authors)) {
        writeup.Authors.forEach(author => authors.add(author));
      }
      
      // Add bounty values
      if (writeup.Bounty) {
        bounties.add(writeup.Bounty);
      }
    });

    return {
      tags: Array.from(tags).sort(),
      programs: Array.from(programs).sort(),
      authors: Array.from(authors).sort(),
      bounties: Array.from(bounties).sort()
    };
  }, [writeups]);

  const handleSearchChange = (value: string) => {
    onFiltersChange({
      ...filters,
      search: value
    });
  };

  const handleTagsChange = (newTags: string[]) => {
    onFiltersChange({
      ...filters,
      selectedTags: newTags
    });
  };

  const handleProgramsChange = (newPrograms: string[]) => {
    onFiltersChange({
      ...filters,
      selectedPrograms: newPrograms
    });
  };

  const handleAuthorsChange = (newAuthors: string[]) => {
    onFiltersChange({
      ...filters,
      selectedAuthors: newAuthors
    });
  };

  const handleReadStatusChange = (event: React.MouseEvent<HTMLElement>, newStatus: 'all' | 'read' | 'unread') => {
    if (newStatus !== null) {
      onFiltersChange({
        ...filters,
        readStatus: newStatus
      });
    }
  };



  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      selectedTags: [],
      selectedPrograms: [],
      selectedAuthors: [],
      readStatus: 'all',
      dateRange: {
        start: null,
        end: null
      }
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.selectedTags.length > 0) count++;
    if (filters.selectedPrograms.length > 0) count++;
    if (filters.selectedAuthors.length > 0) count++;
    if (filters.readStatus !== 'all') count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid',
        borderColor: 'grey.200',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)',
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Badge 
          badgeContent={activeFilterCount} 
          color="primary"
          sx={{
            '& .MuiBadge-badge': {
              background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
              fontWeight: 600,
              fontSize: '0.75rem',
            }
          }}
        >
          <FilterListIcon color="primary" sx={{ fontSize: '1.75rem' }} />
        </Badge>
        <Typography 
          variant="h5" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 600,
            background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Search & Filters
        </Typography>
        {activeFilterCount > 0 && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<ClearIcon />}
            onClick={clearAllFilters}
            sx={{
              borderRadius: 2,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                background: 'linear-gradient(45deg, #ef4444 30%, #dc2626 90%)',
                color: 'white',
                borderColor: 'transparent',
                transform: 'scale(1.05)',
              }
            }}
          >
            Clear All
          </Button>
        )}
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{
            background: expanded ? 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)' : 'transparent',
            color: expanded ? 'white' : 'primary.main',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
              color: 'white',
              transform: 'rotate(180deg)',
            }
          }}
          aria-label="expand filters"
        >
          <ExpandMoreIcon 
            sx={{ 
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }} 
          />
        </IconButton>
      </Box>

      {/* Enhanced Search Bar - Always Visible */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="🔍 Search writeups by title, author, program, tags, or bounty..."
        value={filters.search}
        onChange={(e) => handleSearchChange(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ color: 'primary.main', mr: 1, fontSize: '1.25rem' }} />,
          sx: {
            borderRadius: 3,
            backgroundColor: 'white',
            transition: 'all 0.2s ease-in-out',
            '& .MuiOutlinedInput-root': {
              '&:hover': {
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.15)',
                borderColor: 'primary.main',
              },
              '&.Mui-focused': {
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.25)',
                borderColor: 'primary.main',
              }
            }
          }
        }}
        sx={{ 
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            backgroundColor: 'white',
            fontSize: '1rem',
            fontWeight: 500,
          },
          '& .MuiInputBase-input': {
            padding: '14px 16px',
          }
        }}
      />

      {/* Enhanced Read Status Filter - Always Visible */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 3, 
        mb: expanded ? 3 : 0,
        p: 2,
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
        borderRadius: 2,
        border: '1px solid rgba(99, 102, 241, 0.1)'
      }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            color: 'primary.main',
            fontWeight: 600,
            minWidth: 'fit-content'
          }}
        >
          📊 Status Filter:
        </Typography>
        <ToggleButtonGroup
          value={filters.readStatus}
          exclusive
          onChange={handleReadStatusChange}
          size="medium"
          aria-label="read status filter"
          sx={{
            '& .MuiToggleButton-root': {
              borderRadius: 2,
              px: 2,
              py: 1,
              fontWeight: 500,
              transition: 'all 0.2s ease-in-out',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                transform: 'translateY(-1px)',
                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.15)',
              },
              '&.Mui-selected': {
                background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(45deg, #4338ca 30%, #7c3aed 90%)',
                },
              },
            },
          }}
        >
          <ToggleButton value="all" aria-label="all writeups">
            <AllIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
            All ({writeups.length})
          </ToggleButton>
          <ToggleButton value="read" aria-label="read writeups">
            <ReadIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
            Read ({writeups.filter(w => w.read).length})
          </ToggleButton>
          <ToggleButton value="unread" aria-label="unread writeups">
            <UnreadIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
            Unread ({writeups.filter(w => !w.read).length})
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Advanced Filters - Expandable */}
      {expanded && (
        <>
          <Divider sx={{ my: 2 }} />
          
          <Stack spacing={2}>
            {/* First Row - Tags and Programs */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ minWidth: 250, flex: 1 }}>
                <Autocomplete
                  multiple
                  options={filterOptions.tags}
                  value={filters.selectedTags}
                  onChange={(event, newValue) => handleTagsChange(newValue)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        {...getTagProps({ index })}
                        key={option}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags/Bugs"
                      placeholder="Select tags..."
                      size="small"
                    />
                  )}
                  size="small"
                />
              </Box>

              <Box sx={{ minWidth: 250, flex: 1 }}>
                <Autocomplete
                  multiple
                  options={filterOptions.programs}
                  value={filters.selectedPrograms}
                  onChange={(event, newValue) => handleProgramsChange(newValue)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        {...getTagProps({ index })}
                        key={option}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Programs"
                      placeholder="Select programs..."
                      size="small"
                    />
                  )}
                  size="small"
                />
              </Box>
            </Box>

            {/* Second Row - Authors and Bounty */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ minWidth: 250, flex: 1 }}>
                <Autocomplete
                  multiple
                  options={filterOptions.authors}
                  value={filters.selectedAuthors}
                  onChange={(event, newValue) => handleAuthorsChange(newValue)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        {...getTagProps({ index })}
                        key={option}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Authors"
                      placeholder="Select authors..."
                      size="small"
                    />
                  )}
                  size="small"
                />
              </Box>

              <Box sx={{ minWidth: 200 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Bounty Status</InputLabel>
                  <Select
                    label="Bounty Status"
                    value=""
                    onChange={(e) => {
                      const value = e.target.value as string;
                      if (value && !filters.selectedTags.includes(value)) {
                        handleTagsChange([...filters.selectedTags, value]);
                      }
                    }}
                  >
                    <MenuItem value="">All Bounties</MenuItem>
                    {filterOptions.bounties.map((bounty) => (
                      <MenuItem key={bounty} value={bounty}>
                        {bounty}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Filter Summary */}
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Active Filters:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {filters.selectedTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={`Tag: ${tag}`}
                    size="small"
                    onDelete={() => handleTagsChange(filters.selectedTags.filter(t => t !== tag))}
                    color="primary"
                    variant="outlined"
                  />
                ))}
                {filters.selectedPrograms.map((program) => (
                  <Chip
                    key={program}
                    label={`Program: ${program}`}
                    size="small"
                    onDelete={() => handleProgramsChange(filters.selectedPrograms.filter(p => p !== program))}
                    color="secondary"
                    variant="outlined"
                  />
                ))}
                {filters.selectedAuthors.map((author) => (
                  <Chip
                    key={author}
                    label={`Author: ${author}`}
                    size="small"
                    onDelete={() => handleAuthorsChange(filters.selectedAuthors.filter(a => a !== author))}
                    color="success"
                    variant="outlined"
                  />
                ))}
                {activeFilterCount === 0 && (
                  <Typography variant="body2" color="text.disabled">
                    No filters applied
                  </Typography>
                )}
              </Box>
            </Box>
          </Stack>
        </>
      )}
    </Paper>
  );
}