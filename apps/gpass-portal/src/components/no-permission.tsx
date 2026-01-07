'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { IconLicenseOff } from '@tabler/icons-react';

// import { logout } from 'services/auth';

import { useTranslations } from '@/providers/translation-provider/client';

const NoPermission = () => {
  const theme = useTheme();
  const t = useTranslations('common');

  const handleLogout = () => {};

  return (
    <Box
      sx={{
        height: '100dvh',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <IconLicenseOff color={theme.palette.primary.main} size={100} />
      <Typography
        sx={{ mt: 1, fontSize: 18, fontWeight: 500 }}
        color={theme.palette.text.primary}
      >
        {t('no-permission')}
      </Typography>
      <Typography color={theme.palette.text.secondary} fontSize={18}>
        {t('please-use-other-account')}
      </Typography>

      <Button variant='contained' color='error' sx={{ mt: 2 }} onClick={handleLogout}>
        {t('logout')}
      </Button>
    </Box>
  );
};

export default NoPermission;
