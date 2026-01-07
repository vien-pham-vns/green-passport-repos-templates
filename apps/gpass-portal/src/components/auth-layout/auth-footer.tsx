'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from '@/providers/translation-provider/client';

export default function AuthFooter() {
  const t = useTranslation('login');

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-75%)',
      }}
    >
      <Typography fontSize={11}>{t['footer-content']}</Typography>
    </Box>
  );
}
