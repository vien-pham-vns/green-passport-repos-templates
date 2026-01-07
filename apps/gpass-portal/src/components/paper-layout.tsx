import Paper from '@mui/material/Paper';
import React from 'react';

export function PaperLayout({ children }: { children: React.ReactNode }) {
  return (
    <Paper
      sx={{
        height: '100%',
        padding: 2,
        borderRadius: 1,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
      }}
    >
      {children}
    </Paper>
  );
}
