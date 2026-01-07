'use client';

import { useRouter } from 'next/navigation';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AppConfig } from 'app-config';

import { useTranslations } from '@/providers/translation-provider/client';

const BASE_PATH = AppConfig.BASE_PATH;

export default function NotFound() {
  const t = useTranslations('not-found');
  const commonT = useTranslations('common');
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(`/`);
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
          {/* Header Section with 404 */}
          <Stack spacing={1.5} alignItems='center'>
            <Stack spacing={0.5} alignItems='center' textAlign='center'>
              <Typography
                variant='h1'
                component='div'
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  fontSize: { xs: '3.5rem', sm: '4.5rem', md: '5rem' },
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                404
              </Typography>
              <Typography
                variant='h4'
                component='h1'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  mt: 0.5,
                }}
              >
                {t('page-not-found')}
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.9rem', sm: '0.95rem' },
                  lineHeight: 1.5,
                  maxWidth: '500px',
                  mt: 0.5,
                }}
              >
                {t('page-not-found-description')}
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          {/* Helpful Suggestions */}
          <Stack spacing={1.5}>
            <Stack direction='row' spacing={0.5} alignItems='center'>
              <HelpOutlineIcon
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
                {t('suggestions')}
              </Typography>
            </Stack>

            <Box
              component='ul'
              sx={{
                margin: 0,
                paddingLeft: 3,
                '& li': {
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  marginBottom: 0.5,
                },
              }}
            >
              <li>{t('suggestion-check-url')}</li>
              <li>{t('suggestion-use-navigation')}</li>
              <li>{t('suggestion-go-home')}</li>
            </Box>
          </Stack>

          <Divider />

          {/* Action Buttons Section */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            justifyContent='center'
            flexWrap='wrap'
          >
            <Button
              variant='contained'
              size='medium'
              startIcon={<HomeIcon />}
              href={`${BASE_PATH}/`}
              sx={{
                minWidth: { xs: '100%', sm: 160 },
                height: 42,
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
              }}
            >
              {commonT('go-homepage')}
            </Button>

            <Button
              variant='outlined'
              size='medium'
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
              sx={{
                minWidth: { xs: '100%', sm: 160 },
                height: 42,
                fontWeight: 600,
                textTransform: 'none',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              {commonT('go-back')}
            </Button>
          </Stack>

          {/* Footer Help Text */}
          <Box
            sx={{
              backgroundColor: 'info.50',
              border: '1px solid',
              borderColor: 'info.100',
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
