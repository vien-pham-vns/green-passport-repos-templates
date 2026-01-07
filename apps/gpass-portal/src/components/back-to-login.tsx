import Button from '@mui/material/Button';
import { IconChevronLeft } from '@tabler/icons-react';
import { redirectToLogin } from 'app/actions/auth';

export function BackToLogin({ label, disabled }: { label: string; disabled: boolean }) {
  return (
    <Button
      variant='text'
      startIcon={<IconChevronLeft />}
      sx={{
        color: 'text.secondary',
        fontSize: 14,
        fontWeight: 400,
        underline: 'none',
        textTransform: 'none',
        lineHeight: '140%',
      }}
      disabled={disabled}
      onClick={async () => {
        await redirectToLogin();
      }}
    >
      {label}
    </Button>
  );
}
