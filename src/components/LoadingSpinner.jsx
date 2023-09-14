import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingSpinner() {
  return (
    <Box className="h-[100vh] w-[100vw] flex justify-center items-center">
      <CircularProgress />
    </Box>
  );
}