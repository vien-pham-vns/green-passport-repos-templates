'use client';

import { useTranslation } from '@/providers/translation-provider/client';
import Typography from '@mui/material/Typography';

export function AuthFormTitle() {
  const t = useTranslation('login');

  return (
    <Typography
      fontSize={27}
      sx={{ whiteSpace: 'pre-line' }}
      textAlign='center'
      color='primary.main'
      fontWeight='bold'
    >
      {t['app-name']}
    </Typography>
  );
}
