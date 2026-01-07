'use client';

import Link from 'next/link';
import { useActionState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { showToast } from 'utils/toast';

import { useTranslations } from '@/providers/translation-provider/client';

import { type LoginState, loginAction } from './actions';

const Login = () => {
  const t = useTranslations('login');

  const [state, formAction, isPending] = useActionState<LoginState | null, FormData>(
    loginAction,
    null
  );

  // Show toast on error
  useEffect(() => {
    if (state?.error) {
      showToast(state.error, 'error');
    }
  }, [state?.error]);

  return (
    <Box
      className='login-form'
      component='form'
      action={formAction}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 1.5,
      }}
    >
      {/* Show error alert if there's a general error */}
      {state?.error && !state?.fieldErrors && (
        <Alert severity='error' sx={{ mb: 1 }}>
          {state.error}
        </Alert>
      )}

      <Box>
        <TextField
          required
          fullWidth
          name='email'
          type='email'
          label='Username'
          placeholder={t('username-placeholder')}
          disabled={isPending}
          error={!!state?.fieldErrors?.email}
          helperText={state?.fieldErrors?.email?.[0]}
          autoComplete='email'
          defaultValue={'test@example.com'}
        />
      </Box>

      <Box>
        <TextField
          required
          fullWidth
          name='password'
          type='password'
          label='Password'
          placeholder={t('password-placeholder')}
          disabled={isPending}
          error={!!state?.fieldErrors?.password}
          helperText={state?.fieldErrors?.password?.[0]}
          autoComplete='current-password'
          defaultValue={'password'}
        />
      </Box>

      <Button
        type='submit'
        variant='contained'
        disabled={isPending}
        color='primary'
        fullWidth
        sx={{ textTransform: 'none', fontWeight: 600 }}
      >
        {isPending ? 'Signing in...' : t('sign-in-button')}
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link href={'#'}>
          <Typography fontSize={14}>{t('forgot-password')}</Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
