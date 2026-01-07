import { ReactNode, Suspense } from 'react';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import AppSelectLanguage from '../app-layout/_components/app-language';

const CONTAINER_STYLES = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  position: 'relative',
  background: '#fff',
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
} as const;

const INNER_CONTAINER_STYLES = {
  display: 'flex',
  width: '100%',
  height: '100%',
  maxWidth: { xs: '100%', md: '1920px' }, // Max width constraint for large screens
  margin: '0 auto',
  paddingLeft: { xs: 0, md: '3rem' },
} as const;

const THUMBNAIL_SECTION_STYLES = {
  flex: { xs: '0 0 0%', md: '0 0 45%', lg: '0 0 48%', xl: '0 0 50%' },
  height: '100%',
  position: 'relative',
  display: { xs: 'none', md: 'block' },
  minWidth: 0, // Prevent flex item overflow
} as const;

const FORM_SECTION_STYLES = {
  flex: { xs: '1', md: '0 0 55%', lg: '0 0 52%', xl: '0 0 50%' },
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  paddingRight: { xs: 0, md: '3rem' },
  py: 6,
  overflowY: 'auto',
  minWidth: 0, // Prevent flex item overflow
} as const;

const LANGUAGE_SELECTOR_STYLES = {
  position: 'absolute',
  top: 24,
  right: 24,
  zIndex: 10,
} as const;

const FORM_CONTENT_STYLES = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 'auto',
  marginBottom: 'auto',
  width: '100%',
  maxWidth: { xs: '100%', sm: 450, md: 500 },
  px: { xs: 3, sm: 4, md: 0 },
  gap: 1.5,
} as const;

interface AuthLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  logo?: ReactNode;
  footer?: ReactNode;
}

export const AuthLayout = ({ children, logo, header, footer }: AuthLayoutProps) => {
  return (
    <Box sx={CONTAINER_STYLES}>
      {/* Top Right */}
      <Box sx={LANGUAGE_SELECTOR_STYLES}>
        <Suspense fallback={<Skeleton variant='rounded' width={120} height={40} />}>
          <AppSelectLanguage />
        </Suspense>
      </Box>

      <Box sx={FORM_SECTION_STYLES}>
        <Box sx={FORM_CONTENT_STYLES}>
          {logo}
          {header}
          {children}
        </Box>
        {footer}
      </Box>
    </Box>
  );
};
