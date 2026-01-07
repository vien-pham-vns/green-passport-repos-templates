import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function AppLoading() {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        gap: 1,
      }}
    >
      <CircularProgress size={22} />
      Loading...
    </Box>
  );
}
