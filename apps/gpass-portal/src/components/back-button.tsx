'use client';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigation } from '@/hooks/use-navigation';

interface BackButtonProps {
  label?: string;
  tooltipHoverText?: string;
  tooltipLabel?: string;
  /**
   * Optional navigation configuration for smart back navigation
   * - If provided with sessionKey: attempts to restore query params from sessionStorage
   * - If provided without sessionKey: navigates to the specified path
   * - If not provided: uses browser back navigation
   */
  backTo?: {
    path: string;
    sessionKey?: string;
  };
}

export function BackButton({
  label,
  tooltipHoverText,
  tooltipLabel,
  backTo,
}: BackButtonProps) {
  const { navigate, back } = useNavigation();

  const handleBack = () => {
    if (!backTo) {
      // Default: use browser back navigation
      back();
      return;
    }

    if (!backTo.sessionKey) {
      // Simple path navigation without query params
      navigate(backTo.path);
      return;
    }

    // Smart navigation with session storage
    const sessionQuery = sessionStorage.getItem(backTo.sessionKey);

    if (!sessionQuery) {
      navigate(backTo.path);
    } else {
      navigate(`${backTo.path}?${sessionQuery}`);
      sessionStorage.removeItem(backTo.sessionKey);
    }
  };

  return (
    <>
      <Button
        role='button'
        variant='text'
        size='small'
        tabIndex={-1}
        startIcon={
          <ArrowBack
            sx={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
            }}
          />
        }
        onClick={handleBack}
        sx={{
          color: 'grey.800',
          textTransform: 'none',
          p: 1,
          '&:hover': { backgroundColor: 'brand.50' },
        }}
      >
        <Typography
          variant='subtitle1'
          sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
        >
          {label}
        </Typography>
      </Button>
      <Tooltip title={tooltipHoverText} arrow placement='bottom-start'>
        <Chip
          label={tooltipLabel}
          size='small'
          sx={{
            ml: 1,
            height: 20,
            fontSize: '0.75rem',
            color: 'neutral.800',
            backgroundColor: 'neutral.200',
            display: tooltipLabel ? 'inline-flex' : 'none',
          }}
        />
      </Tooltip>
    </>
  );
}
