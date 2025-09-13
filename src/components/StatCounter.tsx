'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Paper } from '@mui/material';
import { ProcessedWriteup } from '@/types/writeup';

interface StatCounterProps {
  writeups: ProcessedWriteup[];
  type: 'read' | 'unread';
}

const StatCounter: React.FC<StatCounterProps> = ({ writeups, type }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by showing placeholder during SSR
  const count = mounted ? 
    (type === 'read' ? 
      writeups.filter(w => w.read).length : 
      writeups.filter(w => !w.read).length
    ) : 0;

  const label = type === 'read' ? 'Read' : 'Unread';

  return (
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
        {count} {label}
      </Typography>
    </Paper>
  );
};

export default StatCounter;