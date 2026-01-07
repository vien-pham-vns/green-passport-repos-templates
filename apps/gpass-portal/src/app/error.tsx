'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useEffect, useState } from 'react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AppConfig } from 'app-config';

import { resetAnalytics } from '@/lib/analytics-sync';
import { useTranslations } from '@/providers/translation-provider/client';

import { redirectToLogin } from './actions/auth';

const BASE_PATH = AppConfig.BASE_PATH;

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorFallback({ error, reset }: ErrorProps) {
  const t = useTranslations('system-error');
  const commonT = useTranslations('common');
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Log error on mount only - avoid effect dependency on error object
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('Error caught by error boundary:', error);
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    // This ensures server components are re-fetched
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await redirectToLogin();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Logout failed:', err);
      // Fallback: redirect directly
      window.location.href = `${BASE_PATH}/login`;
    } finally {
      setIsLoggingOut(false);
      resetAnalytics();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        position: 'relative',
        padding: { xs: 2, sm: 2, md: 3 },
      }}
    >
      <Container
        maxWidth='md'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack
          spacing={2}
          sx={{
            width: '100%',
            maxWidth: '100%',
            backgroundColor: 'background.paper',
            borderRadius: 2,
            padding: { xs: 3, sm: 4, md: 5 },
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Header Section */}
          <Stack direction='row' spacing={2} alignItems='flex-start'>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: 56, sm: 64 },
                height: { xs: 56, sm: 64 },
                borderRadius: 2,
                backgroundColor: 'error.50',
                border: '2px solid',
                borderColor: 'error.200',
                flexShrink: 0,
              }}
            >
              <ErrorOutlineIcon
                sx={{
                  fontSize: { xs: 36, sm: 40 },
                  color: 'error.main',
                }}
              />
            </Box>

            <Stack spacing={0.5} flex={1}>
              <Typography
                variant='h4'
                component='h1'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                }}
              >
                {t('error-title')}
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.9rem', sm: '0.95rem' },
                  lineHeight: 1.5,
                }}
              >
                {t('common-error')}
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          {/* Error Details Section */}
          <Stack spacing={1.5}>
            <Stack direction='row' spacing={0.5} alignItems='center'>
              <InfoOutlinedIcon
                sx={{
                  fontSize: 18,
                  color: 'primary.main',
                }}
              />
              <Typography
                variant='subtitle2'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                }}
              >
                {t('error-details')}
              </Typography>
            </Stack>

            <Box
              sx={{
                backgroundColor: 'grey.50',
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 1,
                padding: 1.5,
              }}
            >
              <Typography
                variant='body2'
                sx={{
                  color: 'text.secondary',
                  fontFamily: 'monospace',
                  fontSize: '0.8125rem',
                  wordBreak: 'break-word',
                  lineHeight: 1.5,
                }}
              >
                {error.message || t('error-occurred')}
              </Typography>
            </Box>
          </Stack>

          <Divider />

          {/* Action Buttons Section */}
          <Stack spacing={2}>
            <Typography
              variant='subtitle2'
              sx={{
                color: 'text.secondary',
                fontSize: '0.8125rem',
              }}
            >
              {t('try-options')}
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              justifyContent='flex-start'
              flexWrap='wrap'
            >
              <Button
                variant='contained'
                size='medium'
                startIcon={<RefreshIcon />}
                onClick={handleReset}
                sx={{
                  minWidth: { xs: '100%', sm: 140 },
                  height: 42,
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: 'none',
                  },
                }}
              >
                {commonT('try-again')}
              </Button>

              <Button
                variant='outlined'
                size='medium'
                startIcon={<HomeIcon />}
                href={`${BASE_PATH}/`}
                sx={{
                  minWidth: { xs: '100%', sm: 140 },
                  height: 42,
                  fontWeight: 600,
                  textTransform: 'none',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                }}
              >
                {commonT('go-homepage')}
              </Button>
            </Stack>

            <Divider sx={{ my: 0.5 }} />

            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              justifyContent='center'
            >
              <Typography
                variant='body2'
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.8125rem',
                }}
              >
                {t('or')}
              </Typography>
              <Button
                variant='text'
                size='small'
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                disabled={isLoggingOut}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.8125rem',
                }}
              >
                {isLoggingOut ? t('logging-out') : t('back-to-login')}
              </Button>
            </Stack>
          </Stack>

          {/* Footer Help Text */}
          <Box
            sx={{
              backgroundColor: 'primary.50',
              border: '1px solid',
              borderColor: 'primary.100',
              borderRadius: 1,
              padding: 1.5,
            }}
          >
            <Typography
              variant='body2'
              sx={{
                color: 'text.secondary',
                fontSize: '0.8125rem',
                lineHeight: 1.5,
              }}
            >
              <strong>{t('need-help')}</strong> {t('need-help-description')}
            </Typography>
          </Box>
        </Stack>

        {/* Footer Branding */}
        <Box
          sx={{
            marginTop: 2,
            textAlign: 'center',
          }}
        >
          <Typography
            variant='caption'
            sx={{
              color: 'text.disabled',
              fontSize: '0.75rem',
            }}
          >
            ProPass Dashboard - Government Supply Chain Tracking System
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
